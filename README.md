# 图片上传服务
## 前言
用node.js实现的图片上传，**动态裁剪**服务


用到的库有：
> *   express
> *   formidable
> *   fs-extra
> *   node-uuid
> *   quickthumb
> 
> formidable解析上传的图片，fs-extra重命名文件，node-uuid给图片生成唯一的名称（防重名），quickthumb[官方文档](https://github.com/zivester/node-quickthumb): 动态创建多个尺寸的图片
> 
> 注意：ImageMagick is required for this module（quickthumb）, so make sure it is installed.