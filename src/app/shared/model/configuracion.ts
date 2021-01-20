export interface IConfiguracion {
    user_rfc?: string;
    key_file?: string;
    cer_file?: string;
    user_rfc_clave?: string;
    aKey?: string;
    user_id?: number;
    
}

export class Configuracion implements IConfiguracion {
    constructor(
        public user_rfc?: string,
        public key_file?: string,
        public cer_file?: string,
        public user_rfc_clave?: string,
        public aKey?: string,
        public user_id?: number
        
    ){
    }
}
