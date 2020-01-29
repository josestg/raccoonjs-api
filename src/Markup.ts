import { InlineKeyboardButton, InlineKeyboardMarkup } from "./types";

/**
 * Use this function to create bold text
 *
 * @param text - target text
 */
export const bold = (text: string) => `*${text}*`;

/**
 * Use this function to create italic text
 *
 * @param text - target text
 */
export const italic = (text: string) => `_${text}_`;

/**
 * Use this function to create a link
 *
 * @param label - The label
 * @param uri  - The target url
 */
export const link = (label: string, uri: string) => `[${label}](${uri})`;

/**
 * Use this function to create a InlineKeyboardButton
 *
 * @param label - The label
 * @param value - The callback_data value
 */
export const btn = (label: string, value: string) => {
    return { text: label, callback_data: value };
};

export class Gird {
    /**
     * This class is used to arrange the keyboard like a matrix.
     */
    private M: Array<Array<InlineKeyboardButton>> = null;

    /**
     * Grid constructor
     *
     * @param row - Number of rows
     * @param col - Number of columns
     */
    constructor(private row: number, private col: number) {
        this.M = new Array(row);
        for (let i = 0; i < row; i++) {
            this.M[i] = new Array(col);
            for (let j = 0; j < col; j++) {
                this.M[i][j] = { text: "-", callback_data: "-" };
            }
        }
    }

    /**
     * Use this method to put a InlineKeyboardButton to i,j position in the Grid
     *
     * @param i - Row index
     * @param j  - Column index
     * @param btn - The InlineKeyboardButton
     */
    put(i: number, j: number, btn: InlineKeyboardButton): Gird {
        if (i < 0 || i >= this.row) throw new Error("Index of grid row error");
        if (j < 0 || j >= this.col) throw new Error("Index of grid col error");

        this.M[i][j] = btn;

        return this;
    }

    /**
     * Use this method to push a InlineKeyboardButton to the Grid.
     *
     * @param btn - The InlineKeyboardButton
     */
    push(btn: Array<InlineKeyboardButton>): Gird {
        this.M.push([...btn]);
        return this;
    }

    /**
     * Use this method to get the value of Grid
     */
    get value(): InlineKeyboardMarkup {
        return {
            inline_keyboard: this.M
        };
    }
}
