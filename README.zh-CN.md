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
- 冲击标题
- 彩色残影拖尾
- 跟随音乐跳动的歌词
- 一键清理效果
- 内置 KanaWorks_AI LOGO 品牌展示
- `X @KanaWorks_AI` 按钮，可打开作者 X 主页

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

面板顶部的 `X @KanaWorks_AI` 按钮会打开作者 X 主页：

```text
https://x.com/KanaWorks_AI
```

## 效果说明

### Reveal

- `Glitch Reveal`：文字先变成乱码，然后恢复成正常文字。
- `Cyber Decode`：更像终端、黑客、AI 风格的解码效果。
- `Type On`：逐字出现，适合字幕和歌词。
- `Scramble Loop`：文字持续随机变化，适合背景文字或故障提示。

### Style

- `Neon Flicker`：霓虹灯闪烁发光效果。
- `Hologram`：全息投影感，带扫描线、噪声和轻微信号波动。
- `RGB Split`：红色和青色边缘分离。
- `Slice Jitter`：切片错位、抖动、撕裂感文字。

### Motion

- `Impact Title`：标题出现时有强烈冲击缩放。
- `Echo Trail`：文字后面出现彩色残影。
- `Beat Lyrics`：文字根据 `Audio Amplitude` 音频图层跳动。

## Beat Lyrics 音频设置

如果想让文字跟音乐跳动：

1. 把音乐文件拖进合成。
2. 选中音乐图层。
3. 点击 `动画 > 关键帧辅助 > 将音频转换为关键帧`。
4. AE 会生成一个 `Audio Amplitude` 图层。
5. 选中文字图层。
6. 点击 `Beat Lyrics`。

## 清理效果

点击 `Clean KTL` 可以移除这个面板添加的效果、表达式和辅助图层。

## 说明

这是 ScriptUI 面板，不是 C++ 原生 AE 插件。它通过组合 AE 内置效果、表达式和辅助图层来制作文字效果。

LOGO 文件包含在 `KANA Kinetic Text Lab Assets/` 文件夹里。

暂时还没有选择开源许可证。
