# KANA Kinetic Text Lab

KANA Kinetic Text Lab は、After Effects でタイトル、歌詞、字幕、ロゴ、MV 風の文字演出、サイバー系グリッチ文字を簡単に作るための ScriptUI パネルです。

Creator: [KANA / KanaWorks_AI](https://x.com/KanaWorks_AI)

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

## 機能

- グリッチ文字リビール
- サイバー風デコード
- タイピング表示
- ループする文字スクランブル
- ネオン点滅
- ホログラム風スキャン
- RGB 分離
- スライスジッター
- インパクトタイトル
- カラー残像トレイル
- 音楽に反応する歌詞アニメーション
- ワンクリッククリーンアップ
- KanaWorks_AI ロゴ表示
- `X @KanaWorks_AI` ボタンで作者の X プロフィールを開く

## 必要環境

- Adobe After Effects 2026
- macOS または Windows
- 追加のサードパーティ AE プラグインは不要

## インストール

### macOS

次の 2 つを After Effects の ScriptUI Panels フォルダにコピーします。

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

コピー先：

```text
/Applications/Adobe After Effects 2026/Scripts/ScriptUI Panels/
```

### Windows

次の 2 つを After Effects の ScriptUI Panels フォルダにコピーします。

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

コピー先：

```text
C:\Program Files\Adobe\Adobe After Effects 2026\Support Files\Scripts\ScriptUI Panels\
```

After Effects を再起動して、次から開きます。

```text
Window > KANA Kinetic Text Lab.jsx
```

## 基本的な使い方

1. After Effects のコンポジションでテキストレイヤーを作成、または選択します。
2. `Window > KANA Kinetic Text Lab.jsx` を開きます。
3. 次の値を調整します。
   - `Strength`：効果の強さ
   - `Speed`：アニメーション速度
   - `Reveal Sec`：表示にかかる秒数
4. 使いたい効果ボタンをクリックします。

何も起きない場合は、選択しているレイヤーがテキストレイヤーか確認してください。

上部の `X @KanaWorks_AI` ボタンから作者の X プロフィールを開けます。

```text
https://x.com/KanaWorks_AI
```

## エフェクト

### Reveal

- `Glitch Reveal`：ランダム文字から元の文字へ変化します。
- `Cyber Decode`：ターミナル風、ハッカー風のデコード表現です。
- `Type On`：文字を一文字ずつ表示します。
- `Scramble Loop`：文字がランダムに変化し続けます。

### Style

- `Neon Flicker`：ネオンのような発光と点滅を追加します。
- `Hologram`：スキャンライン、ノイズ、発光、軽い信号揺れを追加します。
- `RGB Split`：赤とシアンの色ズレを追加します。
- `Slice Jitter`：切り裂かれたようなデジタル文字の揺れを追加します。

### Motion

- `Impact Title`：タイトル出現時に強いスケールインパクトを追加します。
- `Echo Trail`：文字の後ろにカラフルな残像を作ります。
- `Beat Lyrics`：`Audio Amplitude` レイヤーに反応して文字が動きます。

## Beat Lyrics の設定

音楽に合わせて文字を動かす場合：

1. 音楽ファイルをコンポジションに入れます。
2. 音楽レイヤーを選択します。
3. `Animation > Keyframe Assistant > Convert Audio to Keyframes` を実行します。
4. After Effects が `Audio Amplitude` レイヤーを作成します。
5. テキストレイヤーを選択します。
6. `Beat Lyrics` をクリックします。

## クリーンアップ

`Clean KTL` をクリックすると、このパネルが追加したエフェクト、エクスプレッション、補助レイヤーを削除できます。

## メモ

これは C++ のネイティブ AE プラグインではなく、ScriptUI パネルです。After Effects 標準のエフェクト、エクスプレッション、補助レイヤーを組み合わせて動作します。

ロゴ素材は `KANA Kinetic Text Lab Assets/` に含まれています。

まだライセンスは選択されていません。
