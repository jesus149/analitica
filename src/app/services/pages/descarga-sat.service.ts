import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/shared/model/usuario';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IrfcData } from '../../shared/model/rfc-data';
import { SettingsService } from '../settings.service';

type EntityResponseType = HttpResponse<IUsuario>;
@Injectable({
  providedIn: 'root',
})
export class DescargaSatService {
  resourceUrlCfdi = environment.baseUrlCfdi;
  resourceURLAnalitica = environment.baseUrlAnalityca;

  cfdis: any[] = [
    {value: '1', viewValue: 'Recibidos'},
    {value: '2', viewValue: 'Emitidos'}
  ];

  testList: any[] = [
    {value: '1', viewValue: 'Recibidos'},
    {value: '2', viewValue: 'Emitidos2'},
    {value: '3', viewValue: 'Emitidos3'},
    {value: '4', viewValue: 'Emitidos4'},
    {value: '5', viewValue: 'Emitidos5'},
    {value: '6', viewValue: 'Emitidos6'}
  ];

  constructor(protected http: HttpClient, private settingsService: SettingsService ) {}

  listRFC(usuario: IrfcData): Observable<EntityResponseType> {
    let user = this.settingsService.getLocalUser();
    usuario.user_id = Number(user['user_id']);
    usuario.aKey = environment.aKey;
    
    const options = createRequestOption(usuario);
    return this.http
    .get<IrfcData>(`${this.resourceURLAnalitica}rfc/view`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
    
  }
  
  getCatDfdi(){
    return this.cfdis;
  }

  getlstDescarga(request: any): Observable<EntityResponseType> {
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return  this.http
    .get<IUsuario>(`${this.resourceUrlCfdi}/solicitudes`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

  solicitarDescarga(request: any): Observable<EntityResponseType> {
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return this.http
    .get<IUsuario>(`${this.resourceUrlCfdi}/authsat`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

  verificarDescarga(request: any): Observable<EntityResponseType> {
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return this.http
    .get<IUsuario>(`${this.resourceUrlCfdi}/verifica`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }
  verificarDescargaDom(){
    return this.testList;
  }

}
