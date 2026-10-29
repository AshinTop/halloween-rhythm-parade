[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 🎃 Midnight Rhythm Parade — オリジナル曲で遊ぶハロウィン音楽ゲーム

**4 匹の小さなモンスター、3 曲のオリジナル音楽、灯りのともるハロウィンの通り。** Midnight Rhythm Parade は [Sprunki Game](https://sprunki-game.top/) のために作られた 4 レーンのブラウザー音楽ゲームです。金色の判定線に合わせて叩き、コンボでランタンを灯しましょう。ゆっくり練習するモードもあります。

**[今すぐ遊ぶ](https://halloween-rhythm-parade.crazy3d.org/)** · [ハロウィンゲーム集](https://github.com/AshinTop/halloween-games) · [埋め込みガイド](EMBEDDING.md) · [設計ノート](DESIGN.md)

**README の言語：** English、简体中文、Español、Português (Brasil)、日本語。**ゲーム内の表示は英語と簡体字中国語のみ**です。日本語などの README があっても、ゲームのメニューがその言語に対応しているわけではありません。

![4 レーンのノーツ、金色の判定線、モンスターボタンが並ぶ Midnight Rhythm Parade](docs/images/gameplay.jpg)

## 真夜中のパレードへ 👻

- Web Audio でブラウザー内合成する、3 曲のオリジナル楽曲。
- 4 種類のノーツ形状とモンスターボタン。色だけでなく形と位置でも見分けられます。
- 時間に基づく判定、20 連続ヒットで Lantern Fever、最大 50% のコンボ加点。
- **75% 速度の練習**、一時停止と再開、ローカル記録、曲の共有リンク。
- **−150〜+150 ms** のタイミング調整と、音のオン・オフ。

## 曲目

| 曲 | テンポ | ノーツ数 | 通常速度の長さ |
|---|---:|---:|---:|
| Lantern Walk / 南瓜灯的散步 | 96 BPM | 70 | 48.5 秒 |
| Velvet Wings / 天鹅绒蝠翼 | 112 BPM | 133 | 50.3 秒 |
| Midnight Confetti / 午夜糖果雨 | 126 BPM | 168 | 48.6 秒 |

長さには最初の 4 拍のカウントを含みます。Lantern Walk は穏やかな導入、Velvet Wings はシンコペーションと同時押し、Midnight Confetti は速めのパターンです。旋律、発振器の楽器、再現可能なノイズ打楽器は本作のために作りました。外部の録音音源をダウンロードする方式ではありません。

## 遊び方

曲を選び、必要なら Practice を選んで **Start the parade** を押します。音は操作してから始まります。ノーツが金色のラインに着いた瞬間に、そのレーンを押してください。2 つが同時に来たら同時押しです。

Perfect は **±55 ms**、Good は **±115 ms**、Okay は **±180 ms** の範囲です。ミスするとコンボは切れますが、曲は続きます。途中で終了する体力ゲージはありません。20 連続ヒットで Lantern Fever になり、最後に得点、精度、最大コンボ、判定数を表示します。

練習では譜面を省略せず 75% 速度で再生し、通常速度の最高記録を更新しません。環境に合わせてタイミングを調整できますが、機器や音声出力の遅延自体がなくなるわけではありません。

## 操作

| 操作 | キーボード | タッチ・マウス |
|---|---|---|
| レーン 1〜4 | D、F、J、K | 4 つのモンスターボタン |
| 開始・停止・再開 | フォーム欄の外で Space | メイン再生ボタン |
| 曲の選択 | 選択欄にフォーカス | 曲の選択欄 |
| タイミング調整 | 設定にフォーカス | 歯車ボタン |
| ヘルプ・再挑戦・共有 | Tab と Enter | 各ボタン |

複数の指で同時に押せます。キーを押し続けても連続で得点は入らず、同じノーツを二重に判定することもありません。

## 好きな曲へ戻る

[Velvet Wings の練習リンク](https://halloween-rhythm-parade.crazy3d.org/#song=velvet-wings&practice=1) なら曲と速度を共有できます。自動再生や演奏のアップロードは行いません。

言語、音、タイミング設定、通常速度の記録はブラウザーに保存します。離れたページから途中の演奏は復元しません。ページが隠れる、または音声が中断すると自動で一時停止します。戻って再開すれば、たまった音をまとめて再生することはありません。

## よくある質問

**Sprunki の改造版ですか？** オリジナルの 4 レーンゲームで、Pumpkin Jam と同じハロウィンコレクションの作品です。

**たくさんミスしても最後まで遊べますか？** はい。どの曲も結果画面まで進めます。

**練習で記録が変わりますか？** 通常速度の記録は変わりません。

**スピーカーの遅延もテストしていますか？** いいえ。自動テストは時計と再生予約の処理を確認します。実際の音はブラウザー、機器、音量、出力環境によります。

## スクリーンショットと動画

![落ちてくるノーツ、得点、4 つのタッチボタンを表示した小型の Midnight Rhythm Parade](docs/images/mobile.jpg)

実際のブラウザーで、小さな iframe 内の画面を撮影しています。画面構成を示す画像であり、実機スマートフォンの性能テストではありません。

[24 秒の紹介動画を見る](https://halloween-rhythm-parade.crazy3d.org/intro.html) · [字幕付き MP4 をダウンロード](docs/media/intro.mp4)。無音の動画は実際のゲーム画面を並べた紹介で、連続したプレイの録画ではありません。画像や動画は撮影時点の画面を記録しており、その後の演出変更が含まれない場合があります。

## 自分のサイトに埋め込む

```html
<iframe src="https://halloween-rhythm-parade.crazy3d.org/"
  title="Midnight Rhythm Parade"
  style="display:block;width:100%;height:654px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

想定サイズは 1160×654、390×650、390×794、844×340 CSS ピクセルです。Canvas 2D、ES モジュール、Web Audio に対応した現在のブラウザーを使ってください。音声には権限と機器の遅延が関係します。画面サイズの確認は全実機の動作保証ではありません。

公開版は、この GitHub リポジトリと連携して Cloudflare にデプロイされています。iframe に高さを指定し、親サイトのツールバー用の領域も確保してください。全画面ボタンは親サイト側で用意できます。詳細は [EMBEDDING.md](EMBEDDING.md) を参照してください。

## ローカルで実行・確認する

```sh
python3 -m http.server 4173
```

リポジトリのルートでサーバーを起動し、[http://localhost:4173/](http://localhost:4173/) を開きます。静的なゲームなので、ビルドや依存パッケージのインストールは不要です。`file://` では ES モジュールが読み込めない場合があるため、HTTP(S) を使用してください。テストには Node.js が必要です。

```sh
npm test
```

**13 件のテスト**で、全曲への模擬全 Perfect 入力、判定境界、重複、ミス、練習、設定、リンク、音声予約の上限、停止タブの時間飛び、一時停止、予約音のキャンセル、古い非同期開始コールバックを確認します。模擬満点は人間の演奏や音響測定ではありません。

ゲームのソースはアカウント、外部 API、広告 SDK、外部素材 CDN を必要としません。記録はブラウザー内に保存され、クラウド同期はありません。Cloudflare が独自のホスティング用スクリプトやリクエストログを追加する場合があります。任意の合成音声はブラウザーの再生許可に従います。

## 月明かりの下でもうひと遊び 🍬

- [Pumpkin Jam](https://halloween-sprunki.crazy3d.org/) · [ソース](https://github.com/AshinTop/halloween-sprunki) — ハロウィンのモンスターバンドを組む.
- [Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/) · [ソース](https://github.com/AshinTop/halloween-haunted-maze) — 一人称の迷宮でランタンの精霊を探す.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [ソース](https://github.com/AshinTop/halloween-mirror-hearts) — 鏡のように動く二人のおばけを家へ.
- [Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/) · [ソース](https://github.com/AshinTop/halloween-tripeaks) — 前後の数字をつなぐソリティアと Moon Bridge.

## 制作クレジットと応援

**AshinTop の Midnight Candy Club** のために、人が方向づける AI との協働で企画、プログラミング、文章、テスト、レビューを行いました。オリジナルの絵と合成音は、このプロジェクト向けに制作しています。[設計ノート](DESIGN.md) もご覧ください。

楽しめたら、**[GitHub で Midnight Rhythm Parade に Star を付けてください](https://github.com/AshinTop/halloween-rhythm-parade)**。あとで見つけやすくなり、更新を追う目印にもなります。不具合の報告には、ステージやモード、ブラウザー、画面サイズ、再現手順を添えると助かります。[ハロウィンゲームの全コレクション](https://github.com/AshinTop/halloween-games) もどうぞ。
