import { Random } from 'random-js';

export type Counter = {
    [nextChar: string]: number
};
export type ModelData = {
    [key: string]: Counter
};

export default class Model {
    private _chain_length: number;
    private _data: ModelData;
    private _random: Random;

    constructor(data: ModelData, chain_length: number = 8) {
        this._chain_length = chain_length;
        this._data = data;
        this._random = new Random();
    }

    complete(key: string): string {
        if (key.length > this._chain_length) {
            key = key.substring(key.length - this._chain_length);
        }
        while (key.length > 0) {
            const result = this.selectRandomFromCounter(this._data[key]);
            if (result !== null) {
                return result;
            }
            key = key.substring(1);
        }
        return this._random.pick(Object.keys(this._data));
    }

    getSuggestion(text: string, length: number): string {
        let result = text;
        while (result.length < length) {
            result += this.complete(result);
        }
        return result;
    }

    selectRandomFromCounter(counter: Counter): string | null {
        const total = Object.values(counter ?? {}).reduce((a, b) => a + b, 0);
        if (total === 0) {
            return null;
        }
        const r = this._random.integer(0, total - 1);
        let acc = 0;
        for (const [key, value] of Object.entries(counter)) {
            if (r < acc + value) {
                return key;
            }
            acc += value;
        }
        return null;
    }
}
