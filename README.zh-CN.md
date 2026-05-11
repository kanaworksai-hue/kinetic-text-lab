# KANA Kinetic Text Lab

KANA Kinetic Text Lab 是一个适合新手使用的 After Effects ScriptUI 面板，用来快速制作标题、歌词、字幕、LOGO、MV 文字动画和赛博故障文字效果。

作者：[KANA / KanaWorks_AI](https://x.com/KanaWorks_AI)

语言：[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

## 功能

- 故障文字出现
- 赛博解码文字
- 打字机逐字出现
- 循环乱码跳动
- 霓虹闪烁
- 全息扫描效果
- RGB 分离
- 切片抖动
- 撕裂错位
- 电音脉冲
- 冲击标题
- 彩色残影拖尾
- 刀切碎块并拼合
- 爆发式 Echo
- 调皮文字捣蛋
- 可爱翻滚文字
- 一键清理效果
- 内置 KanaWorks_AI LOGO 品牌展示
- `Want more?` 按钮，可显示作者 X 主页链接

## 使用条件

- Adobe After Effects 2026
- macOS 或 Windows
- 不需要安装第三方 AE 插件

## 安装方法

### macOS

把下面两个项目一起复制到 AE 的 ScriptUI Panels 文件夹：

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

目标文件夹：

```text
/Applications/Adobe After Effects 2026/Scripts/ScriptUI Panels/
```

### Windows

把下面两个项目一起复制到 AE 的 ScriptUI Panels 文件夹：

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

目标文件夹：

```text
C:\Program Files\Adobe\Adobe After Effects 2026\Support Files\Scripts\ScriptUI Panels\
```

然后重启 After Effects，打开：

```text
窗口 > KANA Kinetic Text Lab.jsx
```

## 基本用法

1. 在 AE 合成里创建或选中一个文字图层。
2. 打开 `窗口 > KANA Kinetic Text Lab.jsx`。
3. 调整三个参数：
   - `Strength`：效果强度
   - `Speed`：动画速度
   - `Reveal Sec`：文字出现需要几秒
4. 点击一个效果按钮。

如果点击按钮没有反应，通常是因为你选中的不是文字图层。

面板顶部的 `Want more?` 按钮会显示作者 X 主页链接：

```text
Want to learn more? Follow me
https://x.com/KanaWorks_AI
```

这个按钮不会自动打开浏览器。

## 效果说明

### Reveal

- `Glitch Reveal`：文字先变成乱码，然后恢复成正常文字。
- `Cyber Decode`：更像终端、黑客、AI 风格的解码效果。
- `Type On`：模拟真实打字，一个字一个字出现，末尾带闪烁光标，并保留原文字颜色。
- `Scramble Loop`：文字持续随机变化，并保留原文字颜色，适合背景文字或故障提示。

### Style

- `Neon Flicker`：霓虹灯闪烁发光效果。
- `Hologram`：全息投影感，带扫描线、噪声和轻微信号波动。
- `RGB Split`：红色和青色边缘分离。
- `Slice Jitter`：切片错位、抖动、撕裂感文字。
- `Tear Shift`：横向撕裂条带和错位故障。
- `EDM Pulse`：清晰霓虹电音脉冲，保留原文字颜色，用黑色底影、青/粉/黄绿色 Glow 层和轻微节拍缩放制造舞台感。
- `Cute Roll`：可爱的卡通扭麻花文字，扭动波峰从第一个字母扫到最后一个字母；每个字母都会像海浪一样依次压扁、侧翻、恢复，第一帧和最后一帧保持正常文字形状。
- `Dance`：参考漫画 THUNDER 风格的跳舞标题，红色粗体、黄绿色描边、黑色厚阴影，带弹跳、左右摇摆、快速扭动和爆炸星形背景。

### Motion

- `Impact Title`：清晰版电影预告片砸屏，保留原文字颜色，用快速缩放、短促震动、黑色冲击影和青金色扩散残影制造冲击感。
- `Echo Trail`：文字移动时留下多层透明延迟残影，带速度感和空间感。
- `Knife Shatter`：文字被切成不规则碎块，散开后自动拼回。
- `Echo Burst`：更强的爆发式 Echo 残影。
- `Mischief Text`：调皮文字捣蛋，随机大小写、符号、抖动和弹跳。

## 清理效果

点击 `Clean KTL` 可以移除这个面板添加的效果、表达式和辅助图层。

## 说明

这是 ScriptUI 面板，不是 C++ 原生 AE 插件。它通过组合 AE 内置效果、表达式和辅助图层来制作文字效果。

LOGO 文件包含在 `KANA Kinetic Text Lab Assets/` 文件夹里。

## Copyright

Copyright © Tokyo AI Visuals LLC

## Support Future Development

Help fund GPU time, testing, and future updates.

GPU Support — ¥500 JPY (approx. $3 USD)  
https://www.paypal.com/paypalme/kanaworksai/500

Future Development Support — ¥1500 JPY (approx. $10 USD)  
https://www.paypal.com/paypalme/kanaworksai/1500
