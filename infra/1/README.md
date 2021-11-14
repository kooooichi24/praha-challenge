# IAMのユーザ、グループ、ロール、ポリシーの違いを説明してみよう

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/rec8O2Wn4viQhpYkZ?blocks=hide)

---

## 課題 1
### IAM ユーザ
IAMアカウントとは、ユーザやアプリケーションを表すAWSアカウントによって作成されるエンティティ。
デフォルトではアクセス許可が何も関連付けられていない、必要に応じて権限を付与する。

### グループ
IAMグループとは、IAMユーザを論理的にまとめた集合のこと。

### ポリシー
IAMポリシーとは、AWSのサービスとリソースへのアクセスを許可または拒否するドキュメント。
このIAMポリシーは、IAMユーザやIAMグルwープに紐づけることができる。

### ロール
IAMロールとは、アクセス許可を一時的に利用するために引き受けることができるアイデンティティ。
例えばIAMロールを切り替えることで、PRD環境やSTG環境へアクセス許可が与えられる。

## 課題 2
### ユーザ

#### 1. 日常的にルートユーザを利用しない方が良い理由

```
ルートユーザは全権限を有しており、危険だから。
具体的な例としては「アカウントの悪用」や「誤操作による大きな被害が発生」する危険性がある。
```

[ルートユーザー認証情報が必要なタスク](https://docs.aws.amazon.com/ja_jp/general/latest/gr/root-vs-iam.html#:~:text=%E9%85%8D%E5%B8%83%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%80%82-,%E3%83%AB%E3%83%BC%E3%83%88%E3%83%A6%E3%83%BC%E3%82%B5%E3%82%99%E3%83%BC%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%8B%E3%82%99%E5%BF%85%E8%A6%81%E3%81%AA%E3%82%BF%E3%82%B9%E3%82%AF,-%E9%81%A9%E5%88%87%E3%81%AA%E8%A8%B1%E5%8F%AF)

#### 2. パワーユーザはAdmin権限以外の権限全てを持っている

```
この操作を実行するために必要なアクセス許可がありません。アクセス許可を追加するように管理者に依頼してください。
```

###　グループ

#### 1. ポリシー付与
```
ポリシーは、グループに付与してユーザを所属させる方法が良い。
なぜなら、IAMユーザが別の仕事を担当するときにアクセス許可を簡単に調整できるからだ。
例えば、開発担当者がインフラ担当者に変わる場合、管理者はそのユーザーを "Developers" IAM グループから削除し、"Infras" IAM グループに追加します。これにより、IAMユーザが現在の役割に必要なアクセス許可のみを付与できる。
```

###　サービスのIAM
#### 1. EC2 Access S3
どちらもデフォルトの場合
```bash
[ec2-user@ip-172-31-23-231 ~]$ aws s3 ls s3://myawsbucket0123210
Unable to locate credentials. You can configure credentials by running "aws configure".
```

EC2に以下ロールを付与することでアクセス可能
```
AmazonS3ReadOnlyAccess
```

[Amazon EC2 インスタンスに、Amazon S3 バケットへのアクセス権を付与するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ec2-instance-access-s3-bucket/)

#### 2. EC2に、特定のS3のみ閲覧できるREAD権限を付与する

ポリシー
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::myawsbucket0123210-2",
                "arn:aws:s3:::myawsbucket0123210-2/*"
            ]
        }
    ]
}
```

EC2にロール付与
```
EC2 -> ロール -> ポリシー

EC2: i-0396424f21ab60bac
ロール: OnlyMyawsbucket0123210-2
ポリシー: OnlyMyawsbucket0123210-2

```


実行結果
```bash
[ec2-user@ip-172-31-23-231 ~]$ aws s3 ls s3://myawsbucket0123210
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied

[ec2-user@ip-172-31-23-231 ~]$ aws s3 ls s3://myawsbucket0123210-2
2021-11-14 10:47:47       1700 ec2.pem
```

[特定のバケットまたはフォルダに対する Amazon S3 コンソールのアクセス権をユーザーに付与するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/s3-console-access-certain-bucket/)

#### 3. EC2インスタンスに付与するのは、ロールかポリシーか

EC2インスタンスにロールを付与するべきである。
なぜなら、ポリシーを複数付与した場合、ある作業を実施するには必要ないポリシーが付与された状態になり、セキュリティ上良くないからだ。


### 課題3 
#### クイズ 1

...

<details><summary>回答</summary><div>

...

</div></details>
