export interface IrfcData {
    user_id?: number;
    aKey?: string;
    
}

export class rfcData implements IrfcData {
    constructor(
        public user_id?: number,
        public aKey?: string,
    ){
    }
}
