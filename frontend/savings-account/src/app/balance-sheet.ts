import { TransferType } from "./transfer";

export interface IBalanceSheet {
    entries: Array<BalanceEntry>;
    total: number;
}

export interface IBalanceEntry {
    type: TransferType;
    value: number;
}

export class BalanceSheet implements IBalanceSheet {
    constructor(public entries: Array<BalanceEntry> = [], public total: number = 0) { }

    public getTotalIcon() {
        return '⚖️';
    }

    public getTotalName() {
        return 'Total';
    }

    public getTotalColor(): string {
        if (this.total > 0) return 'green';
        else if (this.total < 0) return 'red';
        else return 'yellow';
    }

    public isEmpty(): boolean {
        return this.entries.length == 0;
    }

    public getPercentageSet(): Array<number> {
        let result: Array<number> = [ 0, 0, 0, 0 ];
        this.entries.forEach(entry => result[entry.type] = entry.value);
        return result.map(value => value / this.total * 100);
    }
}

export class BalanceEntry implements IBalanceEntry {
    constructor(public type: TransferType, public value: number) { }

    public getTypeIcon(): string {
        switch (this.type) {
        case TransferType.SAVINGS:
            return '💸';
        case TransferType.PLEASURE:
            return '🎁';
        case TransferType.CLOTHES:
            return '👕';
        case TransferType.VEHICLE:
            return '🚗';
        default:
            return '';
        }
    }

    public getTypeName(): string {
        switch (this.type) {
        case TransferType.SAVINGS:
            return 'Savings';
        case TransferType.PLEASURE:
            return 'Pleasure';
        case TransferType.CLOTHES:
            return 'Clothes';
        case TransferType.VEHICLE:
            return 'Vehicle';
        default:
            return '';
        }
    }

    public getValueColor(): string {
        if (this.value > 0) return 'green';
        else if (this.value < 0) return 'red';
        else return 'yellow';
    }
}
