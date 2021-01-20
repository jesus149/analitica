import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConfiguracion } from '../../shared/model/configuracion';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings.service';
import { IUsuario } from 'src/app/shared/model/usuario';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';



type EntityResponseType = HttpResponse<IConfiguracion>;
@Injectable({
  providedIn: 'root',
})
export class CargaContaService {
  
  resourceUrl = environment.baseUrlAnalityca;
  resourceUrlCfdi = environment.baseUrlCfdi;
  

  constructor(protected http: HttpClient,
    private settingsService: SettingsService) {}

  cargaArchivos(formData: FormData) {
    let user = this.settingsService.getLocalUser();
    formData.append('user_id', user['user_id']);
    formData.append('aKey', environment.aKey);
    return this.http.post(`${this.resourceUrl}file/add`, formData);
  }

  getPolizas(request: any): Observable<EntityResponseType> {

    let user = this.settingsService.getLocalUser();
    request.aKey = environment.aKey;
    request.user_id = user['user_id'];
    const options = createRequestOption(request);
    return  this.http
    .get<IUsuario>(`${this.resourceUrl}file/view`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

  getCatalogo(){
    let request: any;
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return  this.http
    .get(`${this.resourceUrl}cat/view/cdfiindex`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

  readPolizas(request: any): Observable<EntityResponseType> {
    let user = this.settingsService.getLocalUser();
    request.aKey = environment.aKey;
    request.user_id = user['user_id'];
    const options = createRequestOption(request);
    return  this.http
    .get<IUsuario>(`${this.resourceUrlCfdi}/readxml`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

}
