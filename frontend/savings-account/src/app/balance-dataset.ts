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
                data.savings[i] = row.values[0];
                data.pleasure[i] = row.values[1];
                data.clothes[i] = row.values[2];
                data.vehicle[i] = row.values[3];
                data.total[i] = row.total;
            } else {
                data.savings[i] = data.savings[i - 1] + row.values[0];
                data.pleasure[i] = data.pleasure[i - 1] + row.values[1];
                data.clothes[i] = data.clothes[i - 1] + row.values[2];
                data.vehicle[i] = data.vehicle[i - 1] + row.values[3];
                data.total[i] = data.total[i - 1] + row.total;
            }
        });
        return data;
    }
}
