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
export class ConfiguracionService {
  resourceUrl = environment.baseUrlAnalityca;

  constructor(protected http: HttpClient, private settingsService: SettingsService) {}

  cargaArchivos(formData: FormData) {
    let user = this.settingsService.getLocalUser();
    formData.append('user_id', user['user_id']);
    formData.append('aKey', environment.aKey);

    console.log(JSON.stringify(formData));

    return this.http.post(`${this.resourceUrl}rfc/add`, formData);
  }

 
  deleteRFC(request: any){
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return  this.http
    .get(`${this.resourceUrl}rfc/delete`, { params: options, observe: 'response' })
    .pipe(map((res: any) => (res)));
  }
}
