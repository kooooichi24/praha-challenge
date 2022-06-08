# チーム開発を円滑にするコツを覚えよう


## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recBmwphc3JEZrhkp?blocks=hide)

---

## 課題 1
### 1. PR を小さくする理由
- レビューに時間がかかる
- 議論の観点が複数に及びコミュニケーションコストが増大する
- レビューの観点が漏れる可能性がある
- 後ほどコミットログを見返す場合、そのPRの変更をすぐに理解できない

### 2. コードのコメント
- 書くべきこと
  - コードの一部分の目的
  - 使用方法
  - 使用時の挙動
- 書くべきではないこと
  - そのコードが何をしているかの説明

### 3. Gitのコミットコメント
#### 書くべきこと
1. プレフィックス
    - 具体例
      ```
      feat (feature)
      fix (bug fix)
      docs (documentation)
      style (formatting, missing semi colons, …)
      refactor
      test (when adding missing tests)
      chore (maintain)
      ```
      [Format of the commit message](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message)
    - なぜプレフィックスを書くのか
      - 何に対する変更なのか、わかりやすくするため
      - レビュワーの負担が軽減する
      - コミットログを検索しやすくなる
      
      [プレフィックスをつけた結果](https://qiita.com/numanomanu/items/45dd285b286a1f7280ed#%E3%83%97%E3%83%AC%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%B9%E3%82%92%E3%81%A4%E3%81%91%E3%81%9F%E7%B5%90%E6%9E%9C)
2. 理由
    - 具体例
      - `feat: 〇〇のため、××を追加`
    - なぜ理由を書くのか
      - What や How は変更を見れば理解できるが、Why は変更を見ても変更の意図を推測しづらいから

## 課題 2
- 前提
  - JIRAに詳細は記述済み
- PRテンプレート
  ```md
  ## チケットURL
  [ticket url](url)

  ## 概要
  - 詳細は、チケットに書いてあるので、ここでは最小限に留める

  ## やったこと
  - このPRでやったことを書く

  ## やってないこと
  - このPRでやってないことを書く

  ## UI
  - UI部分に変更が入る場合、スクリーンショットや動画を添付する

  ## その他補足事項
  ```

- 疑問点
  - テンプレートにテスト項目も記述する？

## 課題 3
- ペアプログラミング/モブプログラミング
  - [モブプログラミングをやろう！！アジャイルモンスターのモブプロ入門 #koberb](https://speakerdeck.com/takaking22/mobupuroguraminguwoyarou-aziyairumonsutafalsemobupuroru-men-number-koberb)

## 参考記事
- [Writing a Good Pull Request ](https://developers.google.com/blockly/guides/modify/contribute/write_a_good_pr#keep-it-small)
- [Google Engineering Practices Documentation](https://google.github.io/eng-practices/)
- [僕が考える最強のコミットメッセージの書き方](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e)
- [【今日からできる】コミットメッセージに 「プレフィックス」 をつけるだけで、開発効率が上がった話](https://qiita.com/numanomanu/items/45dd285b286a1f7280ed)
- [Create a Good Pull Request — with Examples and Templates](https://oumaima-dahhoum.medium.com/how-to-create-a-good-pull-request-with-examples-and-templates-cfc92f2bb94e)
- [Pull Requestのテンプレートを作って効率よくレビューしよう！](https://dev.classmethod.jp/articles/pull-request-template/)