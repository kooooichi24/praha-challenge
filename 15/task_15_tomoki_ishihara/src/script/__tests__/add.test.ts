import { add } from "../add";

describe("add関数は引数を全て加算して結果を返す", () => {
  describe("結果が1000以下の場合 結果をそのまま返す", () => {
    it("1, 1 を受け取ると 2 を返す", () => {
      expect(add(1, 1)).toBe(2);
    });
    it("1, 1, 1 を受け取ると 3 を返す", () => {
      expect(add(1, 1, 1)).toBe(3);
    });
  });
  describe(`結果が1000より大きい場合は "too big" を返す`, () => {
    it(`1001 を渡すと "too big" を返す`, () => {
      expect(add(1001)).toBe("too big");
    });
    it(`1000 を渡すと 1000 を返す`, () => {
      expect(add(1000)).toBe(1000);
    });
  });
});
