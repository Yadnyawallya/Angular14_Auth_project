import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:44339/api/User/";
  constructor(private http : HttpClient ) { }


  signup(UserObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,UserObj)
  }


  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }
}
