export interface IDatum {
    status: number;
    message: string;

}

export class Datum implements IDatum{
    constructor(public status: number, public message: string) { }
}
