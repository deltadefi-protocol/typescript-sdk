/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
import { Asset } from '@meshsdk/core';

// Record Samples:
// const utxoAssets = [
//     {
//         unit: 'lovelace',
//         quantity: '1172320',
//     },
//     {
//         unit: 'a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559484f534b594361736847726162303030303435353736',
//         quantity: '1',
//     },
// ];
// const utxoAssets2 = [
//     {
//         unit: 'lovelace',
//         quantity: '117662320',
//     },
//     {
//         unit: 'a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559484f534b59436173684772616230303030546653736',
//         quantity: '1',
//     },
// ];

export class Value {
    value: Record<string, bigint>;

    constructor(assets: Asset[]) {
        this.value = {};
    }

    /**
     * Add an asset to the Value class's value record. If an asset with the same unit already exists in the value record, the quantity of the
     * existing asset will be increased by the quantity of the new asset. If no such asset exists, the new asset will be added to the value record.
     * Implementation:
     * 1. Check if the unit of the asset already exists in the value record.
     * 2. If the unit exists, add the new quantity to the existing quantity.
     * 3. If the unit does not exist, add the unti to the object.
     * 4. Return the Value class instance.
     * @param asset
     * @returns
     */
    addAsset = (asset: Asset): this => {
        // Defines a method named 'addAsset' on the class, which takes an 'asset' parameter of type 'Asset' and returns an instance of the class itself ('this').
        if (this.value[asset.unit]) {
            // Checks if the 'unit' property of the 'asset' object already exists as a key in the 'value' object of the class. If it does, the block inside will execute.
            this.value[asset.unit] += BigInt(asset.quantity);
            // If the unit exists, it adds the 'quantity' of the 'asset' to the existing quantity. The 'quantity' is converted to a BigInt before addition to handle large numbers or to ensure consistency in number type.
        } else {
            // If the unit does not exist in the 'value' object, this block will execute.
            this.value[asset.unit] = BigInt(asset.quantity);
            // It creates a new key in the 'value' object with the name of the unit and sets its value to the 'quantity' of the 'asset', converting the 'quantity' to a BigInt.
        }
        return this;
        // Returns the instance of the class, allowing for method chaining.
    };

    /**
     * Add an array of assets to the Value class's value record. If an asset with the same unit already exists in the value record, the quantity of the
     * existing asset will be increased by the quantity of the new asset. If no such asset exists, the new assets under the array of assets will be added to the value record.
     * Implementation:
     * 1. Iterate over each asset in the 'assets' array.
     * 2. For each asset, check if the unit of the asset already exists in the value record.
     * 3. If the unit exists, add the new quantity to the existing quantity.
     * 4. If the unit does not exist, add the unti to the object.
     * 5. Return the Value class instance.
     * @param assets
     * @returns
     */
    addAssets = (assets: Asset[]): this => {
        // Defines a method named 'addAssets' on the class, which takes an 'assets' parameter of type 'Asset[]' (an array of assets) and returns an instance of the class itself ('this').
        assets.forEach((asset) => {
            if (this.value[asset.unit]) {
                // Checks if the 'unit' property of the 'asset' object already exists as a key in the 'value' object of the class. If it does, the block inside will execute.
                this.value[asset.unit] += BigInt(asset.quantity);
                // If the unit exists, add the quantity to the existing quantity
            } else {
                // If the unit does not exist, initialize it with the asset's quantity
                this.value[asset.unit] = BigInt(asset.quantity);
                // It creates a new key in the 'value' object with the name of the unit and sets its value to the 'quantity' of the 'asset', converting the 'quantity' to a BigInt.
            }
        });
        return this;
        // Allows for method chaining by returning the instance of the class
    };

    /**
     * Substract an asset from the Value class's value record. If an asset with the same unit already exists in the value record, the quantity of the
     * existing asset will be decreased by the quantity of the new asset. If no such asset exists, an error message should be printed.
     * Implementation:
     * 1. Check if the unit of the asset already exists in the value record.
     * 2. If the unit exists, subtract the new quantity from the existing quantity.
     * 3. If the unit does not exist, print an error message.
     * @param asset
     * @returns
     */
    negateAsset = (asset: Asset): this => {
        // Defines a method named 'negateAsset' on the class, which takes an 'asset' parameter of type 'Asset' and returns an instance of the class itself ('this').
        if (this.value[asset.unit]) {
            // Checks if the 'unit' property of the 'asset' object already exists as a key in the 'value' object of the class. If it does, the block inside will execute.
            this.value[asset.unit] -= BigInt(asset.quantity);
            // Subtracts the 'quantity' of the 'asset' from the existing quantity for that unit in the 'value' object. The 'quantity' is converted to a BigInt to handle large numbers or ensure consistency in number type.
            if (this.value[asset.unit] === 0n) {
                // Checks if the resulting quantity is equal to 0.
                delete this.value[asset.unit];
                // If the resulting quantity is equal to 0, it deletes the unit from the 'value' object, effectively removing the asset.
            }
        } else {
            console.error(`Unit ${asset.unit} does not exist.`);
            // If the 'unit' does not exist in the 'value' object, it prints an error message to the console indicating the unit does not exist.
        }
        return this;
        // Returns the instance of the class, allowing for method chaining.
    };

    /**
     * Subtract an array of assets from the Value class's value record. If an asset with the same unit already exists in the value record, the quantity of the
     * existing asset will be decreased by the quantity of the new asset. If no such asset exists, an error message should be printed.
     * @param assets
     * @returns
     */
    negateAssets = (assets: Asset[]): this => {
        assets.forEach((asset) => {
            if (this.value[asset.unit]) {
                // Checks if the 'unit' property of the 'asset' object already exists as a key in the 'value' object of the class. If it does, the block inside will execute.
                this.value[asset.unit] -= BigInt(asset.quantity);
                // If the unit exists, subtract the quantity from the existing quantity
                if (this.value[asset.unit] === 0n) {
                    // Check if the resulting quantity is equal to 0
                    delete this.value[asset.unit];
                    // If yes, delete the unit from the value object
                }
            } else {
                console.error(`Unit ${asset.unit} does not exist.`);
                // If the unit does not exist, print an error message
            }
        });
        return this;
        // Allows for method chaining by returning the instance of the class
    };

    /**
     * Get the quantity of asset object per unit
     * @param unit
     * @returns
     */
    get = (unit: string): Asset => {
        if (this.value[unit]) {
            // Check if the unit exists in the value object
            return { unit: unit, quantity: BigInt(this.value[unit]) };
            // If the unit exists, return an Asset object with the unit and its quantity
        } 
        console.error(`Unit ${unit} does not exist.`);
        return { unit: unit, quantity: '0' };
        // If the unit does not exist, return an Asset object with the unit and a quantity of '0'
        }
    };

    /**
     * Get all assets (return Record of Asset[])
     * @returns
     */
    units = (): Record<string, Asset[]> => {
        const result: Record<string, Asset[]> = {};
        Object.keys(this.value).forEach(unit => {
            if (!result[unit]) {
                result[unit] = [];
            }
            result[unit].push({ unit: unit, quantity: BigInt(this.value[unit]) });
        });
        return result;
    };

    /**
     * Check if the value is greater than or equal to an inputted value
     * @param value
     * @returns
     */
    geq = (value: Value): boolean => {
        return true;
    };

    /**
     * Check if the value is less than the given value
     * @param value
     * @returns
     */
    leq = (value: Value): boolean => {
        return true;
    };

    /**
     * Check if the value is empty
     * @param value
     * @returns
     */
    isEmpty = (): boolean => {
        return true;
    };

    /**
     * Merge the given values
     * @param values
     * @returns
     */
    merge = (values: Value[]): this => {
        return this;
    };
}
