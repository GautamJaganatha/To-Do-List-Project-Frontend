import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/Services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8083/api/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http_ : HttpClient
  ) { }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

  public addCategory(addCateorgy: any) : Observable<any>{
    return this.http_.post(BASIC_URL+ "AddCategory", addCateorgy,{
      headers: this.createAuthorizationHeader(),
    });
  }

  public getCategory() : Observable<any>{
    return this.http_.get(BASIC_URL+'GetCategories',{
      headers: this.createAuthorizationHeader()
    })
  }

  // private createAuthorizationHeader(): HttpHeaders{
  //   return new HttpHeaders().set(
  //     'Authorization', 'Bearer ' + UserStorageService.getToken()
  //   )
  // }
}
