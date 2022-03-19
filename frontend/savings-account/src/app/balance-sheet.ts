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
        return this.entries.filter(e => e.value >= 0).map(e => e.value / this.total * 100);
    }
}

export class BalanceEntry implements IBalanceEntry {
    constructor(public type: TransferType, public value: number) { }

    public getTypeIcon(): string {
        switch (this.type) {
        case 0:
            return '💸';
        case 1:
            return '🎁';
        case 2:
            return '👕';
        case 3:
            return '🚗';
        default:
            return '';
        }
    }

    public getTypeName(): string {
        switch (this.type) {
        case 0:
            return 'Savings';
        case 1:
            return 'Pleasure';
        case 2:
            return 'Vehicle';
        case 3:
            return 'Clothes';
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
