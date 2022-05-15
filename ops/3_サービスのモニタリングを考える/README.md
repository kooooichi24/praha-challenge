# サービスのモニタリングを考える

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recvGz6kktAMwad85?blocks=hide)

---

## 課題 1

### 何をモニタリングするのか？
- フロントエンド
  - JavaScriptのエラー
  - フレームワーク固有の問題
    - ReactやVueなどの固有のエラー
  - ネットワークリクエストの失敗
  - パフォーマンス

### フロントエンドのクラッシュ
- [Sentry](https://sentry.io/welcome/)
- [Datadog](https://www.datadoghq.com)
- [NewRelic](https://newrelic.com/jp)
- [Firebase Crashlytics](https://firebase.google.com/products/crashlytics)

### フロントエンドのエラー
- [LogRocket](https://logrocket.com/)
- [FullStory](https://www.fullstory.com/)

### バックエンドのクラッシュ
- [Datadog | AppKeeper](https://docs.datadoghq.com/ja/integrations/appkeeper/)
  > SIOS AppKeeper は、Datadog から通知を受信すると、失敗した Amazon EC2 サービスを自動的に再起動し、費用のかかる手動介入の必要性を排除します。Datadog がアラートをトリガーすると、AppKeeper Recovery API を使って EC2 サービスを再起動します。

### APIレスポンス
- [Datadog | API Test](https://docs.datadoghq.com/ja/getting_started/synthetics/api_test/)
  > 以下の例は、API テストのサブタイプである HTTP テストの作成を示しています。HTTP テストを作成すると、API エンドポイントを監視 して、失敗や遅延が起きた場合にアラートを受け取ることができます。このチェックによって、アプリケーションがリクエストに応答していることや、予想される応答時間、HTTP ステータスコード、ヘッダー、本文の内容などの定義された条件をすべて満たしていることを検証できます。

### DBのスロークエリ
- [Datadog | Database Monitoring](https://docs.datadoghq.com/ja/getting_started/database_monitoring/)
- [Amazon RDS for PostgreSQL を使用してクエリのログ記録を有効化するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/rds-postgresql-query-logging/)

### 監視した方が良いメトリクス
- フロントエンド
  - [Web Vitals](https://web.dev/vitals/) より参照
    - Largest Contentful Paint (最大視覚コンテンツの表示時間、LCP)
    - First Input Delay (初回入力までの遅延時間、FID)
    - Cumulative Layout Shift (累積レイアウト シフト数、CLS)
    - Time to First Byte (サーバーの初期応答時間、TTFB) 
    - First Contentful Paint (視覚コンテンツの初期表示時間、FCP) 
    - Total Blocking Time (合計ブロック時間、TBT) 
    - Time to Interactive (操作可能になるまでの時間、TTI)
- バックエンド
- DB

#### 参考記事
- [Monitoring 101: Collecting the right data](https://www.datadoghq.com/ja/blog/monitoring-101-collecting-data/)