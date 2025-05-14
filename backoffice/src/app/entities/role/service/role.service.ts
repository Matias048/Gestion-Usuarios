import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, Roles } from '../model/role';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  getRoles():Observable<Roles>{
    return this.http.get<Roles>(environment.apiUrls.roles)
  }
}
