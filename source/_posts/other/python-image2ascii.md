---
title: 〔Python〕將圖像轉換爲ASCII字符畫
tags:
  - Python
categories:
  - - 雜
    - 學習
abbrlink: 595bd7af
date: 2024-04-02 16:51:57
updated: 2024-04-02 16:51:57
description:
cover:
top_img:
---

# 將圖像轉換爲ASCII字符畫

```python
from PIL import Image

ascii_chars = "@%#*+=-:. " # 灰度遞減

def scale_gray(x):
    scale = (len(ascii_chars) - 1) / 255
    return ascii_chars[int(x * scale)]

def image2ascii(image_path, out_width = 100):
    image = Image.open(image_path)

    org_width, org_height = image.size
    org_aspect_radio = org_height / org_width / 2.75

    out_height = int(out_width * org_aspect_radio)
    image_resized = image.resize((out_width, out_height))
    image_grayscale = image_resized.convert('L') # convert('L') 是Pillow庫中Image模塊的一個方法 用於將圖像轉換爲灰度模式

    ans = ""
    for y in range(out_height):
        for x in range(out_width):
            pixel_value = image_grayscale.getpixel((x,y)) # 圖像在位置(x,y)上的灰度值 0-255
            ans += scale_gray(pixel_value)
        ans += "\n"
    return ans

inputimage_path = "E:/Documents/1.jpg"
out_width = 75
ans = image2ascii(inputimage_path, out_width)
print(ans)
```

