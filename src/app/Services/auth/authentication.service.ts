import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../storage/user-storage.service';
import { Observable, catchError, map, throwError } from 'rxjs';

const BASIC_URL = "http://localhost:8083/";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  

  constructor(private _http: HttpClient, private userStorage: UserStorageService) { }




  register(signup: any): Observable<any>{
    
    return this._http.post(BASIC_URL+'register',signup).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors here, e.g., log error message or throw a custom error
        console.error('An error occurred:', error.message);
        return throwError('Registration failed. Please try again later.');
  }));
}

  login(username: any, password: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','Application/json');
    const body = {username, password};
    return this._http.post(BASIC_URL+'authenticate',body,{headers , observe: 'response'}).pipe(
      map((res)=>{
        const token  = res.headers.get('Authorization').substring(7);
        const user: any = res.body;

        if(token && user){
          this.userStorage.SaveToken(token);
          this.userStorage.saveUserRole(user);
          return true;
        }
        return false;
      })
    );
  }

  // private createAuthorizationHeader(): HttpHeaders{
  //   return new HttpHeaders().set(
  //     'Authorization', 'Bearer' + UserStorageService.getToken()
  //   )
  // }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

  public getData(): Observable<any>{
    let _url = "http://localhost:8083/api/v1/demo-controller/";
    return this._http.get(_url + "getData",{
      headers: this.createAuthorizationHeader(),
    })
  }


}
