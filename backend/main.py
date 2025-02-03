from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import cv2
import numpy as np
from PIL import Image
import io
import uuid
import os
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 允许的前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 创建上传和处理后的图片存储目录
UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

class EnhanceParams(BaseModel):
    sharpness: Optional[float] = 1.5     # 锐化程度 (0.1-3.0)
    brightness: Optional[float] = 1.0     # 亮度调整 (0.1-2.0)
    contrast: Optional[float] = 1.0       # 对比度调整 (0.1-2.0)
    denoise: Optional[bool] = False       # 是否降噪
    upscale: Optional[bool] = False       # 是否放大
    scale_factor: Optional[float] = 2.0   # 放大倍数 (1.0-4.0)

@app.post("/api/enhance")
async def enhance_image(
    file: UploadFile = File(...),
    params: EnhanceParams = None
):
    try:
        # 验证文件类型
        if not file.content_type in ["image/jpeg", "image/png", "image/webp"]:
            raise HTTPException(400, "Unsupported file type")

        # 读取图片
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 图像处理
        processed = await process_image(img, params or EnhanceParams())

        # 保存处理后的图片
        output_filename = f"{uuid.uuid4()}.jpg"
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        cv2.imwrite(output_path, processed)

        return {
            "success": True,
            "filename": output_filename,
            "download_url": f"/api/download/{output_filename}"
        }

    except Exception as e:
        raise HTTPException(500, str(e))

async def process_image(img: np.ndarray, params: EnhanceParams) -> np.ndarray:
    try:
        # 降噪
        if params.denoise:
            img = cv2.fastNlMeansDenoisingColored(img)

        # 锐化
        if params.sharpness > 1.0:
            kernel = np.array([[-1,-1,-1],
                             [-1, 9,-1],
                             [-1,-1,-1]]) * params.sharpness
            img = cv2.filter2D(img, -1, kernel)

        # 亮度和对比度调整
        img = cv2.convertScaleAbs(img, alpha=params.contrast, beta=params.brightness * 50)

        # 放大
        if params.upscale:
            scale = min(4.0, max(1.0, params.scale_factor))
            img = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4)

        return img

    except Exception as e:
        raise HTTPException(500, f"Image processing failed: {str(e)}")

@app.get("/api/download/{filename}")
async def download_image(filename: str):
    file_path = os.path.join(PROCESSED_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(404, "File not found")
    return FileResponse(file_path, media_type="image/jpeg", filename=filename)

# 清理任务：删除旧文件
@app.on_event("startup")
async def startup_event():
    # 这里可以添加定期清理旧文件的逻辑
    pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 