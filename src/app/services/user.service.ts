import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DataUser } from '../interfaces/data-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient)
  private baseUrl:string='https://peticiones.online/api/users/'

  constructor() { }
  //promesas
  getAll():Promise<DataUser[]>{
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl))
  }
  delete(id:number):Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`))
  }
}

