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

### GitHub Actionsの ワークフローの実行方法

### 特定ディレクトリ配下のみ

### jobの依存関係

### Security


## 参考記事
- [Node.js のビルドとテスト](https://docs.github.com/ja/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [GitHub ActionsでのUnit Testを高速化する](https://starfish719.netlify.app/github-actions-unit-test/)
- [GitHub Actions ワークフローにおけるジョブ制御](https://developer.mamezou-tech.com/blogs/2022/02/20/job-control-in-github-actions/)
- [GitHub ActionsでAWSの永続的なクレデンシャルを渡すことなくIAM Roleが利用できるようになったようです](https://dev.classmethod.jp/articles/github-actions-without-permanent-credential/)
- [GitHub Actionsでactions/setup-nodeだけでnode_modulesをキャッシュできるのか試してみた](https://dev.classmethod.jp/articles/caching-dependencies-in-workflow-execution-on-github-actions/)