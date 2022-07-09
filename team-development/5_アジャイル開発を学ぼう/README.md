# アジャイル開発を学ぼう

# 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recj6oOEPPrtGP8Vn?blocks=hide)

---

# 課題 1
## アジャイルとは
- アジャイルの目的
  - > アジャイルとは、変化を生み出し、それに対応する能力である。不確実で激動する環境に対処し、最終的に成功するための方法です。
  - [What is Agile?](https://www.agilealliance.org/agile101/#:~:text=Introductory%20Videos-,what%20is%20agile%3F,-Agile%20is%20the)
- アジャイル開発とは
  - > アジャイルソフトウェア開発とは、「アジャイルソフトウェア開発宣言」とその背後にある「12の原則」で示された価値観と原則に基づく一連のフレームワークとプラクティスの包括的な用語である。
  - [What is Agile Software Development? | Agile Alliance](https://www.agilealliance.org/agile101/#:~:text=what%20is%20agile%20software%20development%3F)
- どんな問題を解決するか
  - 不確実性に対処する
- 参考資料
  - [アジャイルが何なのか絶対に理解できます。アジャイル迷子のための「アジャイルの本質」](https://youtu.be/XXLbkYndAJ4)

## 開発スピードが上がる？
- 回答
  - 相対的に、上がることが多い
- 前提
  - 時間当たりの、開発の成果物は同じ（スキルが同じ場合）
- 理由
  - 変化に対応しやすくなるから

## XP
### ユーザストーリー
- ユーザストーリーとは
  - 顧客に見える機能の単位を記述したもの
- テンプレート
  - {役割}として{機能や性能}を実現したい。なぜなら、{ビジネス価値}だからだ。
- なぜユーザストーリを書くのか
  - ユーザーが機能を求める理由を明確にすることで、PO ⇄ Dev で機能の詳細について議論するため
- アンチパターン
  1. Whyに関して記述がない
  2. 受入条件が存在しない
  3. ユーザに価値を提供していない
  4. 大きすぎる（スプリント期間で終了できないくらい）
- 具体的に書かない方が良い理由
  - そもそも、ユーザストーリーは機能の詳細な仕様ではなく、PO ⇄ Dev で詳細を議論するための道具である。
  - 「なぜ機能を実装する必要があるか」の目的について、認識の齟齬が発生しなければ良い。
  - 具体的に書きすぎると、機能を実装する目的が不明確になり、議論しづらくなるからだ。

- 参考資料
  - [ユーザーストーリーとは？](https://slide.meguro.ryuzee.com/slides/48)
  - [より良いユーザーストーリーを書くための10個のヒント](https://www.ryuzee.com/contents/blog/3753)
  - [User Story Traps](https://scrumcrazy.wordpress.com/2011/01/05/user-story-traps/)
  - [9 User Story Smells And Anti-Patterns](https://www.kaizenko.com/%EF%BB%BF9-user-story-smells-and-anti-patterns/)
  - [User Stories Writing: Antipatterns](https://medium.com/@carmineingaldi/user-stories-writing-antipatterns-9e9e1ff710b9)

### ストーリーポイント
- 途中で変えるべきではない
  - なぜなら、原因解明を握り潰すと、振り返りができなくなり、改善ができなくなるから
- 当初見積もった時間
- Dev チーム内で認識の差を埋めるため