import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { createRequestOption } from '../shared/util/request-util';
import { IUsuario } from '../shared/model/usuario';
import { IrfcData } from '../shared/model/rfc-data';
import { SettingsService } from './settings.service';


type EntityResponseType = HttpResponse<IUsuario>;
// type EntityArrayResponseType = HttpResponse<IUsuario[]>;

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  resourceUrl = environment.baseUrlAnalityca;

  constructor(protected http: HttpClient,  private settingsService: SettingsService) {}

  create(usuario: IUsuario): Observable<EntityResponseType> {
    usuario.aKey = environment.aKey;
    //  FIXME: VALIDAR EL EMVIO DE ESTOS PARAMETROS.
    usuario.user_from_id = 1;
    usuario.user_type_id = 1;
    const options = createRequestOption(usuario);
    return this.http
      .get<IUsuario>(`${this.resourceUrl}user/add`, { params: options, observe: 'response' })
      .pipe(map((res: EntityResponseType) => (res)));
  }

  userInfo(usuario: IUsuario): Observable<EntityResponseType> {
    
    usuario.aKey = environment.aKey;
    
    const options = createRequestOption(usuario);
    let result = this.http
    .get<IUsuario>(`${this.resourceUrl}userinfo/loginvalidation`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
    return result
  }
  
  userRFC(usuario: IrfcData): Observable<EntityResponseType> {
    let user = this.settingsService.getLocalUser();
    usuario.user_id =  Number(user['user_id']);
    usuario.aKey = environment.aKey;

    const options = createRequestOption(usuario);
    let result = this.http
    .get<IrfcData>(`${this.resourceUrl}rfc/view`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
    return result
  }

  private guardarUser( usuario: IUsuario) {
    localStorage.setItem('user_id', usuario.user_id.toString());
  }
  

}
