# マルチ AZ に跨る VPC を構築する

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/reccTxD5GVryXD7yN?blocks=hide)

---

## 課題 1

### 1

- パブリックサブネットとは
  - 外部と通信できるサブネット
- プライベートサブネットとは
  - VPC 内部及び、VPN や DirectConnect を通じて接続したオンプレ環境等とプライベートな通信をするサブネット
- 違い
  | | パブリックサブネット | プライベートサブネット |
  | ---- | ---- | ---- |
  | 通信できる対象 | 外部 | VPC 内部及び、VPN や DirectConnect を通じて接続したオンプレ環境 |
  | Route tables の設定 | 0.0.0.0/0 (デフォルトゲートウェイへの通信) がインターネットゲートウェイ | 0.0.0.0/0 (デフォルトゲートウェイへの通信) がインターネットゲートウェイ**ではない** |
- 参照
  - https://blog.serverworks.co.jp/tech/2013/05/23/vpc_beginner-2/

### 2

#### 参照

- [[初心者向け]VPC 作成から EC2 インスタンス起動までを構成図見ながらやってみる（その 1）](https://dev.classmethod.jp/articles/creation_vpc_ec2_for_beginner_1/)
  - [[初心者向け]VPC 作成から EC2 インスタンス起動までを構成図見ながらやってみる（その 2）](https://dev.classmethod.jp/articles/creation_vpc_ec2_for_beginner_2/)
- [【AWS】パブリックサブネットとプライベートサブネットを作成し所属するそれぞれの EC2 インスタンスがインターネットに出ていける設定](https://go-journey.club/archives/8135)

### 課題 2

#### クイズ 1

セキュリティグループとネットワーク ACL の違いを説明してください

<details><summary>回答</summary><div>

セキュリティグループは、インスタンスレベルで動作する。そしてステートフル。
ネットワーク ACL は、サブネットレベルで動作する。そしてステートレス。

- 参考記事
  - https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/VPC_Security.html

## </div></details>

## 疑問

### 1

#### Question

- プライベートサブネットとパブリックサブネットの IPv4 CIDR ブロックサイズって、異なる IPv4 CIDR ブロックサイズにする必要がある？
  - VPC: 10.0.0.0/16
  - パブリックサブネット: 10.0.0.0/24
  - プライベートサブネット: 10.0.1.0/24 <- ここって、10.0.0.0/24 じゃダメなんだっけ？

#### Answer

- VPC に複数のサブネットを作成する場合、サブネットの CIDR ブロックは重複できない
- VPC(10.0.0.0/16)のアドレス範囲は、10.0.0.0 - 10.0.255.255
  - そのため、サブネットは VPC のアドレス範囲内で重複することはできない
  - パブリックサブネット(10.0.0.0/24)の IP アドレス範囲は、10.0.0.0 - 10.0.0.255
  - プライベートサブネット(10.0.1.0/24)の IP アドレス範囲は、10.0.1.0 - 10.0.1.255

#### 参考文献

- [VPC とサブネット](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/VPC_Subnets.html#:~:text=vpc%20%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%83%95%E3%82%99%E3%83%8D%E3%83%83%E3%83%88%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88%E3%80%81%E3%82%B5%E3%83%95%E3%82%99%E3%83%8D%E3%83%83%E3%83%88%E3%81%AE%20cidr%20%E3%83%95%E3%82%99%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AF%E9%87%8D%E8%A4%87%E3%81%A6%E3%82%99%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82)

### 2

#### Question

- パブリックサブネットのルートテーブルの設定がデフォルトのままの場合、パブリックサブネットの EC2 へ SSH 接続できなかった
  - | 送信先      | ターゲット | ステータス | 伝播済み |
    | ----------- | ---------- | ---------- | -------- |
    | 10.0.0.0/16 | local      | アクティブ | いいえ   |
- なぜデフォルトのルートテーブルだとダメなのだろうか？

#### Answer

- インターネット接続を許可していないから？

#### 参考文献

- [Amazon VPC のインスタンスへの接続タイムアウトエラーをトラブルシューティングする方法を教えてください。](https://aws.amazon.com/jp/premiumsupport/knowledge-center/instance-vpc-troubleshoot/)
