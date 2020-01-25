import * as M from "../Markup";

test("Bold format in Markdown", () => {
    expect(M.bold("a")).toBe("*a*");
});

test("Italic format in Markdown", () => {
    expect(M.italic("a")).toBe("_a_");
});

test("Link format in Markdonw", () => {
    expect(M.link("a", "https://a.com")).toBe("[a](https://a.com)");
});

test("Test button format ", () => {
    const b = M.btn("A", "a");
    expect(b.text).toBe("A");
    expect(b.callback_data).toBe("a");
});

const grid = new M.Gird(2, 3);
describe("Test Grid class", () => {
    test("Constructor", () => {
        const val = grid.value;
        expect(val.inline_keyboard).not.toBeNull();
        expect(val.inline_keyboard.length).toBe(2);
        expect(val.inline_keyboard[0].length).toBe(3);
    });

    test("Put button using valid index", () => {
        const a = M.btn("A", "a");
        const b = M.btn("B", "b");
        const val = grid.put(1, 1, b).put(0, 1, a).value.inline_keyboard;
        expect(val[0][1]).toEqual(a);
        expect(val[1][1]).toEqual(b);
    });

    test("Put botton using invalid index", () => {
        expect(() => grid.put(-1, 0, M.btn("A", "a"))).toThrow(/row/);
        expect(() => grid.put(0, -1, M.btn("A", "a"))).toThrow(/col/);
    });

    test("Push a button into last position or tail", () => {
        const c = M.btn("C", "c");
        grid.push([c]);
        const val = grid.value.inline_keyboard.pop();
        expect(val[0]).toEqual(c);
    });

    test("Push mutlipe buttons into last position or tail", () => {
        const d = M.btn("D", "d");
        const e = M.btn("E", "e");
        const vals = grid.push([d, e]).value.inline_keyboard.pop();
        expect(vals.length).toBe(2);
        expect(vals[0]).toEqual(d);
        expect(vals[1]).toEqual(e);
    });
});
