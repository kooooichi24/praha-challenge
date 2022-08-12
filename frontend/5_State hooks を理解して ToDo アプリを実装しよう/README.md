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

## 参考文献
- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
- [react-use](https://github.com/streamich/react-use)