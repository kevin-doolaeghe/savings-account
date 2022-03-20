import { TransferType } from "./transfer";

export interface IBalanceDataset {
    date: Date;
    values: Array<number>;
    total: number;
}

export class BalanceData {
    constructor(
        public time: Array<Date> = [],
        public savings: Array<number> = [],
        public pleasure: Array<number> = [],
        public clothes: Array<number> = [],
        public vehicle: Array<number> = [],
        public total: Array<number> = []) { }

    public isEmpty(): boolean {
        return this.time.length == 0 ? true : false;
    }

    public static toBalanceData(datasets: Array<IBalanceDataset>): BalanceData {
        let data: BalanceData = new BalanceData();
        datasets.forEach((row: IBalanceDataset, i: number) => {
            data.time[i] = row.date;
            if (i == 0) {
                data.savings[i] = row.values[TransferType.SAVINGS];
                data.pleasure[i] = row.values[TransferType.PLEASURE];
                data.clothes[i] = row.values[TransferType.CLOTHES];
                data.vehicle[i] = row.values[TransferType.VEHICLE];
                data.total[i] = row.total;
            } else {
                data.savings[i] = data.savings[i - 1] + row.values[TransferType.SAVINGS];
                data.pleasure[i] = data.pleasure[i - 1] + row.values[TransferType.PLEASURE];
                data.clothes[i] = data.clothes[i - 1] + row.values[TransferType.CLOTHES];
                data.vehicle[i] = data.vehicle[i - 1] + row.values[TransferType.VEHICLE];
                data.total[i] = data.total[i - 1] + row.total;
            }
        });
        return data;
    }
}
