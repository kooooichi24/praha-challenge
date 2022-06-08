# CI環境を整備してみよう

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recPPEcEXmzW70q67?blocks=hide)

---

## 課題 1
[成果物](https://github.com/kooooichi24/github-action-hands-on)

ymlファイル
```yml
name: Check Pull Request

on:
  pull_request:
    types: [opened]

jobs:
  lint:
    runs-on: ubuntu-latest
    timeout-minutes: 10 # job全体
    strategy:
      matrix:
        node-version: [14.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: npm ci
      - run: npm run lint:fix # ここでLint実行
```

実行結果
![assets1](./assets/assets1.jpg)
![assets2](./assets/assets2.png)

## 課題 3
### ビルド時間を短縮する
- ビルド時間を短縮するためにできる事
  - cache
  - jobの並列実行
  - workflowの分割実行
  - CIの実行対象となるファイルを絞り込む
- 具体的な方法
  - cache
    - 成果物
      - [unit-test.yml](https://github.com/kooooichi24/github-action-hands-on/blob/master/.github/workflows/unit-test.yml)
    - 疑問点
      - Q: actions/setup-node@v3 の cache 設定により node_modules が cache できる？
      - A: できない
        - 公式に記載
          - [actions/setup-node](https://github.com/actions/setup-node)
          - > Note: The action does not cache node_modules
        - 同じように勘違いしている人発見
          - [GitHub Actionsでactions/setup-nodeだけでnode_modulesをキャッシュできるのか試してみた](https://dev.classmethod.jp/articles/caching-dependencies-in-workflow-execution-on-github-actions/)
          - > node_modulesのキャッシュはactions/cacheを使おう
            > 
            > 結論としては、node_modulesのキャッシュを行いたいならactions/cacheを使えば良さそうです。
  - jobの並列実行
    - 何も指定しなければ、job は並列実行
    - 順次実行するには、`needs` キーワードで、先行のジョブを指定
    - [GitHub Actions ワークフローにおけるジョブ制御](https://developer.mamezou-tech.com/blogs/2022/02/20/job-control-in-github-actions/)
  - workflowの分割実行
    - `strategy matrix` を利用することで、workflow自体の分割実行が可能
      ```yml
      ...

      jobs:
        test:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              node-version: [12.x, 14.x, 16.x]
          ...
      ```
    - CIの実行対象となるファイルを絞り込む
      - > pushイベントとpull_requestイベントを使用する場合、どのファイルパスが変更されたかに基づいて実行するワークフローを設定することができます。
        - ```yml
          on:
            push:
              paths-ignore:
                - ".husky/**"
                - "*.md"
          ```
        - [on.<push|pull_request|pull_request_target>.<paths|paths-ignore>](https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions)

### GitHub Actionsの ワークフローの実行方法

- 実現方法
  - repository_dispatch で発火するワークフローを作成する
  - 呼び出し側は、WebHooks や curl などを利用してHTTPリクエストを送信
- 具体例
  - [repository-dispatch.yml](https://github.com/kooooichi24/github-action-hands-on/blob/master/.github/workflows/repository-dispatch.yml)
    - ```yml
      ...
      on:
        repository_dispatch:
          types: [repository-dispatch-test]
      ...
      ```
  - curl で呼び出し
    - ```bash
      curl \
      -X POST \
      -H "Accept: application/vnd.github.v3+json" -H "Authorization: token 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" \
      https://api.github.com/repos/kooooichi24/github-action-hands-on/dispatches \
      -d '{"event_type":"repository-dispatch-test","client_payload":{"passed":true,"message":"success"}}'
      ```
  - 結果
    - ![assets3](./assets/assets3.jpg)

- 参考記事
  - [Create a repository dispatch event](https://docs.github.com/ja/rest/repos/repos#create-a-repository-dispatch-event)
  - [repository_dispatch](https://docs.github.com/ja/actions/using-workflows/events-that-trigger-workflows#repository_dispatch)
### 特定ディレクトリ配下のみ
`### ビルド時間を短縮する` の `CIの実行対象となるファイルを絞り込む` にて既に回答済み

### jobの依存関係
`### ビルド時間を短縮する` の `jobの並列実行` にて既に回答済み

### Security
- 手段
  - [シークレットを使用する](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)
    - `Environment secrets` や `Repository secrets` を利用する
      - Environment secrets
        - Env ごとに存在する Secret
      - Repository secrets
        - Repository に存在する単一の Secret
      - [Difference between Github's "Environment" and "Repository" secrets?](https://stackoverflow.com/questions/65957197/difference-between-githubs-environment-and-repository-secrets#:~:text=Repository%20secrets%20are%20specific%20to,are%20specific%20to%20an%20environment.)
- やってみた
  - `Repository secrets` に設定
    - ![assets4](./assets/assets4.jpg)
  - workflow
    ```yml
    name: Test

    on:
      repository_dispatch:
        types: [repository-dispatch-test]

    jobs:
      Repository-Dispatch-Test:
        runs-on: ubuntu-latest
        timeout-minutes: 5 # job全体
        steps:
          - run: echo ${{ secrets.SECRET_HOGE }}
    ```
  - 実行結果
    - ![assets5](./assets/assets5.jpg)

- 参考記事
  - [GitHub Actions のセキュリティ強化](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)
  - [Github Actions で secret を使う](https://qiita.com/inouet/items/c7d39ac4641c05eec4a0)

## 参考記事
- [Node.js のビルドとテスト](https://docs.github.com/ja/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [GitHub ActionsでのUnit Testを高速化する](https://starfish719.netlify.app/github-actions-unit-test/)
- [GitHub ActionsでAWSの永続的なクレデンシャルを渡すことなくIAM Roleが利用できるようになったようです](https://dev.classmethod.jp/articles/github-actions-without-permanent-credential/)
