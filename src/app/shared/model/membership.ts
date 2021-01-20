export interface IMembership {

    membership_type_id?: string;
    membership_description?: string;
    membership_price_1_month?: number;
    membership_price_12_month?: number;
    membership_price_24_month?: number;
    membership_price_36_month?: number;
    membership_descargas_rfc?: number;
    membership_razones_sociales?: number;
    membership_carga_polizas_contables?: string;
    membership_revision_diferencias_generales?: string;
    membership_revision_diferencias_detalle?: string;
    membership_consulta_validacion_listas_negras?: string;
    membership_calculo_validacion_pagos_provisionales?: string;
    membership_balanza_contable?: string;
    membership_indicadores_razones_financieras?: string;
    membership_estudio_origen_aplicacion_recursos?: string;
    membership_analytics?: string;
    membership_asistencia_tecnica_correo?: string;
    membership_asistencia_tecnica_chat?: string;
    membership_asistencia_contable?: string;
    membership_asesoria_fiscal?: string;
}

export class Membership implements IMembership {
    constructor(

        public membership_type_id?: string,
        public membership_description?: string,
        public membership_price_1_month?: number,
        public membership_price_12_month?: number,
        public membership_price_24_month?: number,
        public membership_price_36_month?: number,
        public membership_descargas_rfc?: number,
        public membership_razones_sociales?: number,
        public membership_carga_polizas_contables?: string,
        public membership_revision_diferencias_generales?: string,
        public membership_revision_diferencias_detalle?: string,
        public membership_consulta_validacion_listas_negras?: string,
        public membership_calculo_validacion_pagos_provisionales?: string,
        public membership_balanza_contable?: string,
        public membership_indicadores_razones_financieras?: string,
        public membership_estudio_origen_aplicacion_recursos?: string,
        public membership_analytics?: string,
        public membership_asistencia_tecnica_correo?: string,
        public membership_asistencia_tecnica_chat?: string,
        public membership_asistencia_contable?: string,
        public membership_asesoria_fiscal?: string
    ) {
    }
}
