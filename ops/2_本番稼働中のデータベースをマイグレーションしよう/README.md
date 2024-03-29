# 本番稼働中のデータベースをマイグレーションしよう

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recic3eCyBrLZpyGU?blocks=hide)

---

## 1. 
### マイグレーションとは
- マイグレーションとは、状態を移行させること
- DBにおけるマイグレーションとは、DBのテーブル定義を変更させること
- マイグレーションツールを用いることで、開発者間で変更を共有および検知できる
- もし、マイグレーションツールを導入していなかったら
  - 他の誰かがテーブル定義を変更したことに気づかずに、古いテーブル定義のまま、開発をしていました、、、、ということが発生してしまう

### Expand and contract pattern とは
- マイグレーションの手法の一種
- 既存のデータ構造と並列に、新しいデータ構造を導入することで、ダウンタイムを発生させることなくデータ移行できるような手法

### Expand and contract pattern の方法
7つのステップで実現できる
1. 新しいスキーマを作成＆デプロイ

    要件を満たす新たなスキーマを作成する。この際に、既存のスキーマは変更しない。
    例えば、`name`カラムを`first_name`、`last_name`カラムに変更したい場合は、`name`カラムのテーブルに、`first_name`、`last_name`カラムを新規追加する。
    
    カラムレベルの変更の場合は、現在のカラムをそのままにして、新しいカラムをテーブルに追加する。より複雑な変更の場合は、新しいテーブルを作成する。

2. インターフェースの拡張

    DBの書き込み操作の時のみ、既存のスキーマと新しいスキーマの両方に書き込み処理を実施する。

3. 既存のデータを新しいスキーマへ移行

    新しいスキーマは、2.のステップ以前のデータを保持していないので、既存のデータを新しいスキーマに移行する。

4. 新しいインターフェースのテスト

    新しいスキーマへの書き込みのインターフェースが正しいことや、正しく読み込みが実施できることをテストする。

5. 新しいスキーマからの読み込みを有効にする

    インターフェースを修正し、既存のスキーマからの読み込みを削除し、新しいスキーマからの読み込みを有効にする。
    
    このステップでは、既存のスキーマへの書き込み処理は削除しない。なぜなら、何かしらの不具合が発生したときに、既存のスキーマへのロールバックを実施できるから。

6. 既存のスキーマへの書き込みを削除する

    ステップ5で、正しく動作することが確認できたので、既存のスキーマへの書き込みを削除する

7. 既存のスキーマを削除

    既存のスキーマを削除する

### NOT NULL制約 によるマイグレーションの失敗を防ぐためには
- 例
    
    |id|name  |
    |--|------|
    |1 |Tanaka|
    |2 |Sato  |
    |3 |Suzuki|

    上記のテーブルに、新たに`age`カラムを追加するケース

- 発生原因
  - NOT NULL制約のカラムを追加したい既存テーブルに、既存レコードが存在し、その値がNULLになってしまうから
- 解決策
  - デフォルト値を用いる
    - デフォルト値とNOT NULL制約を指定してマイグレーション実施
    - その後、デフォルト値の設定を削除する
- やってみた
  ```sql
  test=# CREATE TABLE users (
    id integer PRIMARY KEY,
    name varchar(10)
  );

  test=# \dt
         List of relations
   Schema | Name  | Type  | Owner 
  --------+-------+-------+-------
   public | users | table | root
  (1 row)

  test=# INSERT INTO users(id, name) VALUES(1, 'Tanaka');
  INSERT 0 1
  test=# INSERT INTO users(id, name) VALUES(2, 'Sato');
  INSERT 0 1
  test=# INSERT INTO users(id, name) VALUES(3, 'Suzuki');
  INSERT 0 1

  test=# SELECT * FROM users;
   id |  name  
  ----+--------
    1 | Tanaka
    2 | Sato
    3 | Suzuki
  (3 rows)

  /* エラー発生 */
  test=# ALTER TABLE users ADD COLUMN age int NOT NULL;
  ERROR:  column "age" contains null values

  /* DEFAULT値を設定すると成功 */
  test=# ALTER TABLE users ADD COLUMN age int DEFAULT 20 NOT NULL;
  ALTER TABLE
  test=# SELECT * FROM users;
   id |  name  | age 
  ----+--------+-----
    1 | Tanaka |  20
    2 | Sato   |  20
    3 | Suzuki |  20
  (3 rows)

  test=# ALTER TABLE users ALTER COLUMN age DROP DEFAULT;
  ALTER TABLE
  ```

## 2.

### Before After
- Before
  - PairsとUsersが、1対多の関係
- After
  - PairsとUsersが、多対多の関係
  - そのため、中間テーブルを導入する

### 手順書
[マイグレーション作業手順書](https://docs.google.com/spreadsheets/d/1_MFLtiKTnepBzQI-dwWzFbOj8CGLAEYetMLf_x4gKjQ/edit#gid=0)

[マイグレーション対象のサンプルコード](./migrate-demo/)

### 発生し得る問題
- ステップ5の、新しいスキーマからの読み込みを有効にした後に、ロールバックするときに問題が発生する
- 新しいスキーマで新たに取得した情報が、ロールバックすると、既存のスキーマには書き込まれない問題がある

### 他にどんな情報があると良いか
- 踏み台へアクセスする際のコマンド
- DBへ接続するコマンド
- ロールバック時の手順

### メモ
## 参考文献
- [Using the expand and contract pattern for schema changes](https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern)
- [ParallelChange](https://martinfowler.com/bliki/ParallelChange.html)