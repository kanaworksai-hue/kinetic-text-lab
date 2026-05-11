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
- ティアシフト
- EDM パルス
- インパクトタイトル
- カラー残像トレイル
- ナイフカット風の破片化と再構築
- エコーバースト
- いたずら文字
- かわいいロール文字
- ワンクリッククリーンアップ
- KanaWorks_AI ロゴ表示
- `Want more?` ボタンで作者の X プロフィールリンクを表示

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

上部の `Want more?` ボタンから作者の X プロフィールリンクを表示できます。

```text
Want to learn more? Follow me
https://x.com/KanaWorks_AI
```

このボタンはブラウザを自動で開きません。

## エフェクト

### Reveal

- `Glitch Reveal`：ランダム文字から元の文字へ変化します。
- `Cyber Decode`：ターミナル風、ハッカー風のデコード表現です。
- `Type On`：本物のタイピングのように一文字ずつ表示し、末尾に点滅カーソルを追加します。元の文字色は保持します。
- `Scramble Loop`：元の文字色を保持したまま、文字がランダムに変化し続けます。

### Style

- `Neon Flicker`：ネオンのような発光と点滅を追加します。
- `Hologram`：スキャンライン、ノイズ、発光、軽い信号揺れを追加します。
- `RGB Split`：赤とシアンの色ズレを追加します。
- `Slice Jitter`：切り裂かれたようなデジタル文字の揺れを追加します。
- `Tear Shift`：横方向の裂け目とズレを作ります。
- `EDM Pulse`：元の文字色を保ち、黒いコア影とシアン/マゼンタ/ライムの Glow レイヤーで作る、読みやすいネオン EDM パルスです。
- `Cute Roll`：先頭の文字から最後の文字へツイストの波が走る、かわいいカートゥーン風ロールです。各文字が順番につぶれ、横にひねられ、最後は通常の形状に戻ります。
- `Dance`：漫画の THUNDER 風タイトルです。赤い太字、ライムの縁取り、黒い厚い影に、跳ね、横揺れ、ツイストの残像、爆発スター背景を加えます。

### Motion

- `Impact Title`：元の文字色を保ったまま、パンチのあるズーム、短いヒット揺れ、黒いインパクト影、シアン/ゴールドの衝撃エコーを加える、読みやすい映画予告風タイトルスラムです。
- `Echo Trail`：文字移動に合わせて、多層の透明な遅延残像を作ります。スピード感と奥行きを出します。
- `Knife Shatter`：文字を不規則な破片に切り、散らしてから再構築します。
- `Echo Burst`：より強いバースト型のエコー残像を作ります。
- `Mischief Text`：大文字小文字、記号、揺れ、跳ねを使った遊び心のある文字演出です。

## クリーンアップ

`Clean KTL` をクリックすると、このパネルが追加したエフェクト、エクスプレッション、補助レイヤーを削除できます。

## メモ

これは C++ のネイティブ AE プラグインではなく、ScriptUI パネルです。After Effects 標準のエフェクト、エクスプレッション、補助レイヤーを組み合わせて動作します。

ロゴ素材は `KANA Kinetic Text Lab Assets/` に含まれています。

## Copyright

Copyright © Tokyo AI Visuals LLC

## Support Future Development

Help fund GPU time, testing, and future updates.

GPU Support — ¥500 JPY (approx. $3 USD)  
https://www.paypal.com/paypalme/kanaworksai/500

Future Development Support — ¥1500 JPY (approx. $10 USD)  
https://www.paypal.com/paypalme/kanaworksai/1500
