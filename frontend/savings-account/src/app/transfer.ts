import { DatePipe } from "@angular/common";

export interface ITransfer {
    id: number;
    description: string;
    date: Date;
    value: number;
    type: TransferType;
    status: boolean;
}

export class Transfer implements ITransfer {
    constructor(
        public id: number = -1,
        public description: string = "",
        public date: Date = new Date(),
        public value: number = 0,
        public type: TransferType = TransferType.SAVINGS,
        public status: boolean = false) { }

    public getFormattedDate(): any {
        return new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    }

    public getValueColor(): string {
        if (this.value > 0) return 'green';
        else if (this.value < 0) return 'red';
        else return 'yellow';
    }

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

    public getStatusIcon(): string {
        if (this.status) return '✔️';
        else return '❌';
    }
}

export enum TransferType {
    SAVINGS,
    PLEASURE,
    CLOTHES,
    VEHICLE,
}

export interface Type {
    value: TransferType;
    name: String;
}

export interface Status {
    value: Boolean;
    name: String;
}

export const transferTypes: Type[] = [
    { value: TransferType.SAVINGS, name: '💸 Savings' },
    { value: TransferType.PLEASURE, name: '🎁 Pleasure' },
    { value: TransferType.CLOTHES, name: '👕 Clothes' },
    { value: TransferType.VEHICLE, name: '🚗 Vehicle' },
];

export const transferStatus: Status[] = [
    { value: true, name: '✔️ Done' },
    { value: false, name: '❌ Waiting' },
];
