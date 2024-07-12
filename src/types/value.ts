/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
import { Asset } from '@meshsdk/core';

export class Value {
    value: Asset[];

    /**
     * Value is a class that represents a value.
     * @property {number} amount - The amount of the value.
     * @property {string} currency - The currency of the value.
     */
    constructor(assets: Asset[]) {
        this.value = assets;
    }

    addAsset = (asset: Asset): this => {
        return this;
    };

    addAssets = (assets: Asset[]): this => {
        return this;
    };

    negateAsset = (asset: Asset): this => {
        return this;
    };

    negateAssets = (assets: Asset[]): this => {
        return this;
    };

    get = (unit: string): Asset => {
        return { unit: '', quantity: '' };
    };

    units = (): string[] => {
        return [];
    };

    geq = (value: Value): boolean => {
        return true;
    };

    leq = (value: Value): boolean => {
        return true;
    };

    isEmpty = (): boolean => {
        return true;
    };

    merge = (values: Value[]): this => {
        return this;
    };
}
