# ログの取り方を学ぼう

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recDWk2PcmSJ4UW9u?blocks=hide)

---

## 課題 1

### ログレベル
- ログレベルとは
  - ログの用途によって、分類したもの
- ログレベルの種類
  |レベル|概要|説明|いつ使うか|
  |-|-|-|-|
  |fatal|致命的なエラー|プログラムの異常終了を伴うようなもの|障害時|
  |error|エラー|予期しないその他の実行時エラー|例外発生時|
  |warn|警告|アプリケーションは提供できるが対応が望まれる|ネットワークエラーなどの一時的な環境条件のとき|
  |info|情報|実行時の何らかの注目すべき事象（開始や終了など）|記録しておくべき情報を実行するとき|
  |debag|デバッグ情報|システムの動作状況に関する詳細な情報|開発時|
  |trace|トレース情報|デバッグ情報よりも、更に詳細な情報|開発時|
- メリット
  - ログレベルという共通認識を持つことで、対応方針が明確になる

### 含めるべきログと含めるべきではないログとは
- 含めるべきログ
  - 4W1H に従うのが良い(WHYは不要)
  - 処理時間（いつ）
  - アクセス元（誰が）
  - アクセス対象（誰に）
  - 処理内容（どんなリクエストをしたか）
  - 処理対象（何を処理したか）
  - 処理結果（どうなったか）
  - イベントID（一連のイベントのID）
  - ログレベル（ログのレベル）
- 含めるべきではないログ（もしくは、マスキングする必要あり） 
  - 個人情報
  - パスワード
  - etc

[Data to exclude](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Logging_Cheat_Sheet.md#data-to-exclude)

### いつログを出力すべきか
- HTTP Request/Response が発生するとき
- DBとの接続時と DB操作の結果
- 認証の成功と失敗
- 認証（アクセス制御）の失敗
- セッション管理の失敗 例：クッキーのセッション識別値の変更
- アプリケーションエラーとシステムイベント

### パースしやすいログメッセージ

||パースしづらい例|パースしやすい例|
|-|-|-|
|ログメッセージの順番は同じにすること|TIMESTAMP: LOG_LEVEL: MESSAGE <br> LOG_LEVEL: MESSAGE: TIMESTAMP|TIMESTAMP: LOG_LEVEL: MESSAGE <br> TIMESTAMP: LOG_LEVEL: MESSAGE|
|ログメッセージは構造体にしよう|2019-06-20T17:21:00.002899+00:00 app[email-wrkr.1]: DEBUG: Fetching mailing list 14777|2019-06-20T17:21:00.002899+00:00 app[email-wrkr.1]: DEBUG: Fetching mailing list {"listid":14777}|

### さまざまなログ
- アクセスログ
  - 対象のシステムに対して、アクセスした人が操作したことの記録
  - 例えば、踏み台サーバや、Webサービスなど
- アプリケーションログ
  - アプリケーションがロギングするログのこと
  - 正常な動作の記録、発生したエラーの記録、ユーザーによる予期しない操作の成功・失敗の内容などの出力するように設定したログのこと
- エラーログ
  - エラー発生時のログ
- （フロントエンドの）ユーザーログ
  - DOMを操作したログ
- データベースのクエリログ
  - DDL,DML,DCL の操作ログ
  - トランザクションログ

### ログローテーション
- ログローテーションとは
  - 指定期間が経過すると、自動でログファイルを削除すること
- メリット
  - ログを定期的に削除することで、ログの肥大化を防ぐことができる

#### 参考記事
- [ログ設計指針](https://qiita.com/nanasess/items/350e59b29cceb2f122b3)
- [開発者が運用を経験すべき一つの理由](https://dev.classmethod.jp/articles/recommend-operation-for-bigoted-developers/)
- [ロギング設計大全](https://scrapbox.io/kawasima/%E3%83%AD%E3%82%AE%E3%83%B3%E3%82%B0%E8%A8%AD%E8%A8%88%E5%A4%A7%E5%85%A8)
- [ロギングベストプラクティス](https://scrapbox.io/kawasima/%E3%83%AD%E3%82%AE%E3%83%B3%E3%82%B0%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9)
- [ログ出力指針の書き方](https://seri.hatenablog.com/entry/2018/10/20/172656)
- [ログ出力の設計指針。書き方、フォーマットの例](https://applis.io/posts/how-to-design-log-output)
- [【実録ドキュメント】そのログ本当に必要ですか？](https://atmarkit.itmedia.co.jp/ait/articles/0705/24/news133.html)
- [INFOレベル以上の情報のみでそのリクエストによって何の処理が行われたかがトレースできるか](https://dev.classmethod.jp/articles/recommend-operation-for-bigoted-developers/#:~:text=%E3%81%8D%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%80%82-,info%E3%83%AC%E3%83%98%E3%82%99%E3%83%AB%E4%BB%A5%E4%B8%8A%E3%81%AE%E6%83%85%E5%A0%B1%E3%81%AE%E3%81%BF%E3%81%A6%E3%82%99%E3%81%9D%E3%81%AE%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E4%BD%95%E3%81%AE%E5%87%A6%E7%90%86%E3%81%8B%E3%82%99%E8%A1%8C%E3%82%8F%E3%82%8C%E3%81%9F%E3%81%8B%E3%81%8B%E3%82%99%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B9%E3%81%A6%E3%82%99%E3%81%8D%E3%82%8B%E3%81%8B,-%E3%83%AD%E3%82%B0%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AF)
- [Logging Best Practices: The 13 You Should Know](https://www.dataset.com/blog/the-10-commandments-of-logging/#:~:text=1.%20don%E2%80%99t%20write%20logs%20by%20yourself%20(aka%20don%E2%80%99t%20reinvent%20the%20wheel))
- [Use structured logging](https://devcenter.heroku.com/articles/writing-best-practices-for-application-logs#use-structured-logging)
- [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Logging_Cheat_Sheet.md)
