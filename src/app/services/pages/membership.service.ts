import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { map } from 'rxjs/operators';
import { IMembership } from '../../shared/model/membership';

type EntityResponseType = HttpResponse<IMembership>;

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  resourceUrlCfdi = environment.baseUrlCfdi;
  resourceURLAnalitica = environment.baseUrlAnalityca;

  constructor(protected http: HttpClient) { }
  getAllMembership(request: any) {
    
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    
    return this.http
    .get<IMembership>(`${this.resourceURLAnalitica}membership/info`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }

  getXMembership(request: any): Observable<EntityResponseType> {
    request.aKey = environment.aKey;
    const options = createRequestOption(request);
    return this.http
    .get<IMembership>(`${this.resourceURLAnalitica}membership/info`, { params: options, observe: 'response' })
    .pipe(map((res: EntityResponseType) => (res)));
  }
}
