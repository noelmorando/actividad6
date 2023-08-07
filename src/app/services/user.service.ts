import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DataUser } from '../interfaces/data-user.interface';
import { User } from '../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient)
  private baseUrl:string='https://peticiones.online/api/users/'
  activeRoute = inject(ActivatedRoute)
  constructor() { }
  //promesas
  getAll(page:number):Promise<DataUser[]>{
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl+"?page="+page))
  }
  delete(id:string):Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`))
  }
  insert(formValue:any):Promise <User>{
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl,formValue))
  }
  update(formValue:User, id:string):Promise<User>{
      return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${id}`,formValue))
  }
  getById(id:string):Promise <User>{
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}${id}`))
  }
}

