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

## 参考記事
- [Node.js のビルドとテスト](https://docs.github.com/ja/actions/automating-builds-and-tests/building-and-testing-nodejs)