# State hooks を理解して ToDo アプリを実装しよう
## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recz98d5DUTBytIUk?blocks=hide)

---

## 課題 1
### Hooks のメリット
- React のクラス型コンポーネントのデメリットを解決することができる
  - クラス型コンポーネントのデメリット
    - constructor, super, bind や this などを記述する必要があり、冗長。
    - ライフサイクル関数は時間的凝集であるが、ライフサイクル内の処理は偶発的凝集になっている
- ステートフルなロジックをコンポーネント間で再利用しやすくなる
  - クラス型コンポーネントで実現しようとすると、HOC や Render Props パターンで実装する必要がある
    - コードを追うのが難しくなる
    - ラッパー地獄が発生する

### 使えそうな外部フック
- 外部フック
  - [useCookie](https://github.com/streamich/react-use/blob/master/docs/useCookie.md)
- 用途
  - Cookie の管理
- 使い方
  - 実際は、[react-cookie](https://www.npmjs.com/package/react-cookie) を導入すると良い
  - react-cookie の利用方法は Hooks と HOC の2種類があり、Hooks の場合、useCookie が利用されている
- おすすめのポイント
  - Cookie 制御などは、自前で実装するよりも外部ライブラリを利用した方がミスも少ない

## 課題 2
[PR](https://github.com/kooooichi24/nextjs-todo-app/pull/1)

## 課題 3
### Container/Presentational パターンのメリット
- 解決したかった課題
  - 1つのコンポーネントが見た目とデータ取得の両方に関心があると
    - 単一責任の原則を満たしていない
    - 再利用性が低い
    - といった課題がある。
- どうやって解決したのか
  - Container/Presentational パターン
    - Container
      - ステートフル
      - ロジックに責務を持つ
    - Presentational
      - ステートレス
      - 見た目に責務を持つ
- Container/Presentational パターンのメリット
  - 関心が分離される
    - テストが容易になる
      - Container はロジックのみ
      - Presentational は見た目のみ。StoryBookを導入しやすくなる
  - 再利用性が高まる
- Container/Presentational パターンのデメリット
  - ラッパー地獄になる
- Hooks の台頭
  - Hooks でも、「ロジックと見た目」の関心を分離することが可能
  - コンポーネントの階層を1段減らすことができる

### 参考記事
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/)
- [Container/Presentationalパターン再入門](https://zenn.dev/kazu777/articles/9460c75b7cd8d1)
- [Container Componentに書いていたlogicをCustom Hooksに書いてみる](https://zenn.dev/hakushun/articles/befc9323cb2494)

## 課題 4
1. state 変数は 1 つにすべきですか、たくさん使うべきですか？
    ```tsx
    function Box() {
      const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
      // ...
    }
    ```

## 参考文献
- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
- [react-use](https://github.com/streamich/react-use)
