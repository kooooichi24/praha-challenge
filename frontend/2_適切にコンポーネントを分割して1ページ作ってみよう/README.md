# 適切にコンポーネントを分割して1ページ作ってみよう
## 課題内容

[airtable](https://airtable.com/appWjizyFJue33ycs/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recJOd5LycU7CqsJv?blocks=hide)

---

## 課題 1
### アトミックデザインとは
- アトミックデザインとは
  - デザインシステムを実現するための、モジュール化手法のこと
    - モジュールは、atoms, molecules, organisms, templates, pages で構成する
    > Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner.
    > 
    > アトミックデザインは、より意図的かつ階層的な方法でインターフェースデザインシステムを作成するために一緒に働く5つの異なるステージで構成される方法論です。
    > [The atomic design methodology](https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology)
- アトミックデザインを採用するメリット
  - 分割することで、責務が明確になる
- アトミックデザインを採用するデメリット
  - ？
- アトミックデザインの提唱者の2022年時点での意見
  - [Brad Frost on what’s next after Atomic Design](https://www.youtube.com/watch?v=jR0Gefa4lpg)
    - まだ見れていない

### 用語の説明
- page
  - テンプレートに実際のコンテンツを適用したもの
- template
  - コンテンツ構造を示す
  - 画像やテキストなどのコンテンツ情報が存在しない、レイアウトのようなもの
- organism
  - 例
    - ヘッダー
      - ロゴ画像、主要なナビゲーション・リスト、検索フォームなどの異なる要素で構成される
    - 商品のリスト(グリッド表示)
      - 複数の商品カードで構成される
  - 責務
    - 1つのセクションを実現する
- molecule
  - 例
    - 検索フォーム
    - ラベル、入力、ボタンの atom から構成される
  - 責務
    - 1つの機能を実現する
- atom
  - 例
    - フォームラベル、入力、ボタンなど、これ以上分解しても機能しなくなるような基本的なHTML要素
  - 責務
    - 基本的な構成要素

### 原文
> - Atoms are UI elements that can’t be broken down any further and serve as the elemental building blocks of an interface.
> - Molecules are collections of atoms that form relatively simple UI components.
> - Organisms are relatively complex components that form discrete sections of an interface.
> - Templates place components within a layout and demonstrate the design’s underlying content structure.
> - Pages apply real content to templates and articulate variations to demonstrate the final UI and test the resilience of the design system.

[To sum up atomic design in a nutshell:](https://atomicdesign.bradfrost.com/chapter-2/#:~:text=to%20sum%20up%20atomic%20design%20in%20a%20nutshell%3A)

### 疑問点
1. page と template の違い
    - Presentational Components と Container Components みたいな感じ？
      - 少し概念が違いそう
      - [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    - 単純にコンテンツの有無だと思う
      - コンテンツなしの枠組み
        - template
      - template + コンテンツ
        - page
2. 見分け方
    - 分類
      - atom
        - html タグ
      - molecule
        - > 「〇〇エリア」「〇〇ボックス」「〇〇領域」と呼ばれるもの
      - organism
        - section 単位
    - 参考文献
      - [Atomic Design における Atom, Molecule, Organism の見極め方](https://a-suenami.hatenablog.com/entry/2019/04/29/173415)
      - [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
        - ![insta](./assets/atomic-design-example-instagram.png)

### function component vs class component
- 具体例
  - functional component
      ```ts
      import React, { useState } from "react";

      export default function App() {
        const [count, setCount] = useState(0);

        return (
          <div className="App">
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
          </div>
        );
      }
      ```
  - class component
      ```ts
      import React from "react";

      export default class App extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 0
          };
        }

        render() {
          return (
            <div>
              <p>You clicked {this.state.count} times</p>
              <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                Click me
              </button>
            </div>
          );
        }
      }
      ```
- 前提
  - React 16.8 から追加された Hooks が存在する以前は、class component しか状態を管理できなかった
  - Hooks が存在する以降は、functional component でも状態を管理できるようになった
- 違い
  ||class component|functional component|
  |-|-|-|
  |状態管理|可能|可能|
  |render関数|必要|不要|
  |extends React.Component|必要|不要|
  |constructor|必要|不要|
  |lifecycle|使用可|使用可|
- 感想
  - Hooks すごい
  - [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/) を Hooks を利用することで実現できる

## 課題2

- [PR](https://github.com/kooooichi24/nextjs-tutorial/pull/1)

## 参考文献
- [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
- [Patterns](https://www.patterns.dev/)
