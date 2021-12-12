# S3 を理解する

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/rec4PGVJp3Dc9tspn?blocks=hide)

---

## 課題 1

### 0. Usecase

S3 のユースケースは、下記などが存在する

- バックアップ
  - 容量無制限のストレージである S3 にデータをバックアップする
- アーカイブ
  - ログデータなどをアーカイブする際の置き場所として、S3 を利用する
- ホスティング
  - 静的コンテンツを S3 にホスティングする
- データレイク
  - データレイクとして、S3 を利用する

#### 参考記事

- [【AWS Black Belt Online Seminar】S3 ユースケース及びサービスアップデート](https://d1.awsstatic.com/webinars/jp/pdf/services/20180731_AWS_BlackBelt_S3_usecase_updates_public.pdf)
- [Amazon S3 の仕様とユースケースについてあらためて調べてみた](https://michimani.net/post/aws-about-amazon-s3/)

### 1. Storage Class

| Storage Class           | Usecase                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| S3 Standard             | ホスティング系、CodePipeline のアーティファクト、CFn テンプレートファイルの置き場所 |
| S3 Standard-IA          | バックアップ                                                                        |
| S3 One Zone-IA          | ログ                                                                                |
| S3 Intelligent-Tiering  | アクセス頻度が不明のとき                                                            |
| S3 Glacier              | アーカイブ                                                                          |
| S3 Glacier Deep Archive | アーカイブ                                                                          |

※ 会社で利用している S3 は、ほとんど Standard だった。CloudTrail の保存先として利用していた S3 も Standard だった(400 日後に Delete 指定していた)。One Zone-IA でも良いと思う。

ほとんどアクセスされない(=アーカイブ)場合、Glacier を選択すると思う

#### 参考記事

- [Amazon S3 ストレージクラス](https://aws.amazon.com/jp/s3/storage-classes/)
- [Amazon S3 ストレージクラスを使用する](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/storage-class-intro.html#s3-outposts)
- [6 つの S3 ストレージクラスの選択に迷った時みるチャートをつくってみた](https://dev.classmethod.jp/articles/should_i_choice_s3_storage_class/)
- [S3 のストレージタイプ(標準, 低頻度,1 ゾーン低頻度)を使い分けてストレージコストを最小化する](https://qiita.com/s-katsumata/items/927e57834ca5256c4eee)

### 2 Life Cycle

- ライフサイクルとは一般的には、生まれてから死ぬまでの遷移する過程のこと
- S3 のライフサイクルも同様
  - オブジェクトが作成されてから、ストレージクラスが遷移していき、削除されるまで
- ライフサイクルは、S3 のオブジェクトに対して適用する
- ライフサイクルには主に 2 つのアクションがある
  - 1 つは、移行
    - 移行の向きはダウングレードしか存在しないみたい
      - [サポートされている移行と関連する制約](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#:~:text=amazon%20s3%20%E3%81%AF%E3%80%81%E4%BB%A5%E4%B8%8B%E3%81%AE%E5%9B%B3%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%82%99%E3%82%AF%E3%83%A9%E3%82%B9%E9%96%93%E3%81%AE%E7%A7%BB%E8%A1%8C%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AB%E3%83%A2%E3%83%86%E3%82%99%E3%83%AB%E3%82%92%E3%82%B5%E3%83%9B%E3%82%9A%E3%83%BC%E3%83%88%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)
  - もう 1 つは、失効
    - 有効期限を定義して、期限が切れたらオブジェクトを削除する

### CFn

- [s3-bucket-apply-lifecycle-transition-and-expire-rule.yml](./cfn/s3-bucket-apply-lifecycle-transition-and-expire-rule.yml)

## 課題 2

### バージョニングとレプリケーション

- バージョニング
  - オブジェクトの複数のバリアントを同じバケット内に保持する手段
  - すべてのオブジェクトのすべてのバージョンを保存、取得、復元できる
  - バケット自体の話
- レプリケーション
  - S3 バケット間でオブジェクトを自動で非同期的にコピーできる
  - バケット間の話

### CFn

- Target S3 (Tokyo Region)
  - [s3-bucket-apply-versioning-and-replication-tokyo.yml](./cfn/s3-bucket-apply-versioning-and-replication-tokyo.yml)
- Destination S3 (Osaka Region)
  - [s3-bucket-apply-versioning-and-replication-osaka.yml](./cfn/s3-bucket-apply-versioning-and-replication-osaka.yml)

#### 参考記事

- [(第 3 回)CloudFormation で環境構築を効率化 ～ Amazon S3 クロスリージョンレプリケーション構成編 ～](https://itport.cloud/?p=15461)

## 課題中に湧いてきた疑問

### 1

#### Question

- CFn で S3 構築する際に、region 指定できなんだけど、どうやって指定するんだろう
- Management Console は指定できるのに、、、

#### Answer

- CFn のスタックを実行するリージョンに S3 バケットが構築されるみたい
  - [AWS Cloudformation Template - Set Region in S3 Bucket](https://stackoverflow.com/questions/39587692/aws-cloudformation-template-set-region-in-s3-bucket)

### 2

#### Question

- どうやって S3 にストレージクラスを指定するんだろう

#### Answer

- ストレージクラスを指定する対象は、S3 の**オブジェクト**。バケットではない。
- そのため、Management Console で S3 のバケット作成時は、ストレージクラスを指定する項目がない
