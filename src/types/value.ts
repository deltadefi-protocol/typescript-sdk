/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
import { Asset } from '@meshsdk/core';

// interface Asset {
//     unit: string;
//     quantity: bigint;
// }

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

    constructor() {
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
     * @returns this
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
     * @returns this
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
     * @returns this
     */
    negateAsset = (asset: Asset): this => {
        // Defines a method named 'negateAsset' on the class, which takes an 'asset' parameter of type 'Asset' and returns an instance of the class itself ('this').
        if (this.value[asset.unit]) {
            // Checks if the 'unit' property of the 'asset' object already exists as a key in the 'value' object of the class. If it does, the block inside will execute.
            const newQuantity = this.value[asset.unit] - BigInt(asset.quantity);
            // Subtracts the 'quantity' of the 'asset' from the existing quantity for that unit in the 'value' object. The 'quantity' is converted to a BigInt to handle large numbers or ensure consistency in number type.
            if (newQuantity > 0n) {
                this.value[asset.unit] = newQuantity;
                // If the resulting quantity is greater than 0, update the quantity for that unit in the 'value' object.
            } else if (newQuantity === 0n) {
                delete this.value[asset.unit];
                // If the resulting quantity is equal to 0, delete the unit from the 'value' object, effectively removing the asset unit.
            } else {
                this.value[asset.unit] = newQuantity;
            }
        } else {
            this.value[asset.unit] = -BigInt(asset.quantity);
        }
        return this;
    };

    /**
     * Subtract an array of assets from the Value class's value record. If an asset with the same unit already exists in the value record, the quantity of the
     * existing asset will be decreased by the quantity of the new asset. If no such asset exists, an error message should be printed.
     * @param assets
     * @returns this
     */
    negateAssets = (assets: Asset[]): this => {
        assets.forEach((asset) => {
            if (this.value[asset.unit]) {
                const newQuantity = this.value[asset.unit] - BigInt(asset.quantity);
                if (newQuantity > 0n) {
                    this.value[asset.unit] = newQuantity;
                } else if (newQuantity === 0n) {
                    delete this.value[asset.unit];
                } else {
                    this.value[asset.unit] = newQuantity;
                }
            } else {
                this.value[asset.unit] = -BigInt(asset.quantity);
            }
        });
        return this;
    };

    /**
     * Get the quantity of asset object per unit
     * @param unit
     * @returns
     */
    get = (unit: string): bigint => {
        if (this.value[unit]) {
            // Check if the unit exists in the value object
            return BigInt(this.value[unit]);
            // If the unit exists, return an Asset object with the unit and its quantity
        }
        console.error(`Unit ${unit} does not exist.`);
        return BigInt(0);
        // If the unit does not exist, return an Asset object with the unit and a quantity of '0'
    };

    /**
     * Get all assets (return Record of Asset[])
     * @param
     * @returns Record<string, Asset[]>
     */
    units = (): Record<string, { unit: string; quantity: bigint }[]> => {
        // Defines a method named 'units' on the class, which returns a Record object where the keys are the units and the values are an array of objects containing the unit and quantity.
        const result: Record<string, { unit: string; quantity: bigint }[]> = {};
        // Initializes an empty Record object named result to store the result
        Object.keys(this.value).forEach((unit) => {
            // Iterates over each key in the 'value' object of the class
            if (!result[unit]) {
                result[unit] = [];
            }
            // If the unit does not exist in the result object, initialize it as an empty array
            result[unit].push({ unit, quantity: BigInt(this.value[unit]) });
            //
        });
        return result;
        // Returns the result object containing the units and their quantities
    };

    /**
     * Check if the value is greater than or equal to an inputted value
     * @param unit - The unit to compare (e.g., "ADA")
     * @param other - The value to compare against
     * @returns boolean
     */
    geq = (unit: string, other: Value): boolean => {
        // Defines a method named 'geq' on the class, which takes a 'unit' parameter of type 'string' and an 'other' parameter of type 'Value' and returns a boolean value.
        if (this.value[unit] === undefined || other.value[unit] === undefined) {
            // Checks if the unit does not exist in either the current value object or the value object of the 'other' parameter.
            return false;
            // If the unit does not exist in either object, return false.
        }
        return BigInt(this.value[unit]) >= BigInt(other.value[unit]);
        // Compares the quantity of the unit in the current value object with the quantity of the same unit in the 'other' value object. The comparison is done using BigInt to handle large numbers or ensure consistency in number type.
    };

    /**
     * Check if the value is less than the inputted value
     * @param unit - The unit to compare (e.g., "ADA")
     * @param other - The value to compare against
     * @returns boolean
     */
    leq = (unit: string, other: Value): boolean => {
        // Defines a method named 'leq' on the class, which takes a 'unit' parameter of type 'string' and an 'other' parameter of type 'Value' and returns a boolean value.
        if (this.value[unit] === undefined || other.value[unit] === undefined) {
            // Checks if the unit does not exist in either the current value object or the value object of the 'other' parameter.
            return false;
            // If the unit does not exist in either object, return false.
        }
        return BigInt(this.value[unit]) <= BigInt(other.value[unit]);
        // Compares the quantity of the unit in the current value object with the quantity of the same unit in the 'other' value object. The comparison is done using BigInt to handle large numbers or ensure consistency in number type.
    };

    /**
     * Check if the value is empty
     * @param
     * @returns boolean
     */
    isEmpty = (): boolean => {
        return Object.keys(this.value).length === 0;
        // Returns a boolean value indicating whether the 'value' object of the class is empty (i.e., has no keys).
    };

    /**
     * Merge the given values
     * @param values
     * @returns this
     */
    merge = (values: Value | Value[]): this => {
        // Ensure values is always an array
        const valuesArray = Array.isArray(values) ? values : [values];
        // If the 'values' parameter is an array, assign it to 'valuesArray'; otherwise, create an array with 'values' as the only element.

        valuesArray.forEach((other) => {
            // Iterate over each 'other' value in the 'valuesArray'
            Object.entries(other.value).forEach(([key, value]) => {
                // Iterate over each key-value pair in the 'value' object of the 'other' value
                if (this.value[key] === undefined) {
                    this.value[key] = BigInt(value);
                    // If the key does not exist in the 'value' object of the class, add the key and its value to the 'value' object.
                } else {
                    this.value[key] = BigInt(this.value[key]) + BigInt(value);
                    // If the key already exists in the 'value' object, add the value to the existing value for that key.
                }
            });
        });
        return this;
        // Return the instance of the class to allow for method chaining.
    };
}
