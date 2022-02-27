export class Transfer {

    constructor(
        public id: number,
        public description: string,
        public date: Date,
        public amount: number,
        public type: TransferType,
        public status: boolean) { }

}

export enum TransferType {
    SAVINGS,
    PLEASURE,
    VEHICLE,
    CLOTHES
}