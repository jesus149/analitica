export interface IUsuario {
    user_pass?: string;
    user_id?: number;
    user_email?: string;
    user_type_description?: string;
    user_name?: string;
    user_from_description?: string;
    aKey?: string;
    user_type_id?: number;
    user_from_id?: number;
}

export class Usuario implements IUsuario {
    constructor(
        public user_pass?: string,
        public user_id?: number,
        public user_email?: string,
        public user_type_description?: string,
        public user_name?: string,
        public user_from_description?: string,
        public aKey?: string,
        public user_type_id?: number,
        public user_from_id?: number
    ){
    }
}
