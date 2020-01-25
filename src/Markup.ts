import { InlineKeyboardButton, InlineKeyboardMarkup } from "./types";

export const bold = text => `*${text}*`;
export const italic = text => `_${text}_`;
export const link = (label, uri) => `[${label}](${uri})`;
export const btn = (label, value) => {
    return { text: label, callback_data: value };
};

export class Gird {
    private M: Array<Array<InlineKeyboardButton>>;

    constructor(private row: number, private col: number) {
        this.M = new Array(row);
        for (let i = 0; i < row; i++) {
            this.M[i] = new Array(col);
            for (let j = 0; j < col; j++) {
                this.M[i][j] = { text: "-", callback_data: "-" };
            }
        }
    }

    put(i: number, j: number, btn: InlineKeyboardButton): Gird {
        if (i < 0 || i >= this.row) throw new Error("Index of grid row error");
        if (j < 0 || j >= this.col) throw new Error("Index of grid col error");

        this.M[i][j] = btn;

        return this;
    }

    push(btn: Array<InlineKeyboardButton>): Gird {
        this.M.push([...btn]);
        return this;
    }

    get value(): InlineKeyboardMarkup {
        return {
            inline_keyboard: this.M
        };
    }
}
