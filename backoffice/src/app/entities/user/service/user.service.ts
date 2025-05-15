import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../model/user.model';
import { Userpaginated } from '../model/userpaginated';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  getUsers(page: number, size: number, filters?:string): Observable<Userpaginated>{
    let params = new HttpParams()
    .set('page', (page - 1).toString())
    .set('size', size.toString())

    if(filters !==undefined && filters !== null && filters.trim() !== ''){
      params=params.set('filter', filters);
    }
    return this.http.get<Userpaginated>( environment.apiUrls.getUsers, {params})
  }

  getUser(id:number): Observable<User>{
    return this.http.get<User>(environment.apiUrls.getUser + id);
  }

  addUser(user: User):Observable<User>{
    return this.http.post<User>(environment.apiUrls.addUser, user)
  }

  updateUser(id:number,user: User): Observable<User>{
    return this.http.put<User>(environment.apiUrls.editUser + id, user);
  }

  deleteUser(id:number): Observable<User>{
    return this.http.delete<User>(environment.apiUrls.deleteUser + id);
  }
}
