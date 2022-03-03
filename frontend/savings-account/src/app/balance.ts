import { TransferType } from "./transfer";

export class Balance {

    constructor(public type: TransferType, public amount: number) { }

}