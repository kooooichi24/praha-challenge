# lintを使おう

## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recMEiNq2a17Huw6j?blocks=hide)

---

## 課題 1
### 0. lint とは
- プログラムを静的解析することや静的解析ツールのことを lint と呼ぶ
- 静的解析は、主に2つの種類が存在する
  1. コーディング規約に違反しているかチェックするツール
  2. バグになりうる問題のある箇所を見つけるためのツール

### 1. lint を利用する理由
- コードの品質を担保するため

### 2. ESLintのルール
`eslint:recommended` から5つ抜粋しようとしたが、どれが重要か順位づけができなかったです、、

- [no-var](https://eslint.org/docs/rules/no-var)

### 3. eslint-config-airbnb & 課題 2
[node-ts-jest-eslint-prettier-boilerplate](./node-ts-jest-eslint-prettier-boilerplate/)


## 課題 2
### Git Hooks
誤った状態でコードを更新しないために、コミットとプッシュ前にそれぞれ検査する必要がある。

- pre-commit
  - lint
  - format
- pre-push
  - test
  - developやmasterブランチへのプッシュは、禁止もしくは確認する

### 問題点
- `pre-commit`や`pre-push`を実行したくないときも、実行されてしまう？
  - `git commit --no-verify`や`	git commit -`でスキップ可能


#### 参考記事
- [ESLint Rules](https://eslint.org/docs/rules/)
- [eslint-config-* の比較表](https://zenn.dev/tapioca/articles/5685d794f6452b#ecmascript-6)
- [分かった気になる静的解析](https://qiita.com/s-tanoue/items/7eb485409765442fcb54)
- [Awesome ESLint](https://github.com/dustinspecker/awesome-eslint)
- [pre-commitでこんな自動レビューをしています！手戻りが少なくて最高！](https://tech.appbrew.io/entry/2020/05/15/132413)
  > - master, develop branchでのcommitを禁止
  > - コンフリクト未解消ファイルがあったらコミットさせない
  > - CircleCIのconfigをvalidateする
  > - register_devicesをvalidate