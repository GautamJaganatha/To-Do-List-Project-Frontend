import { Injectable } from '@angular/core';

const TOKEN = 'token';
const ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }


  public SaveToken(token: string): any{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token)
  }

  public saveUserRole(role: string): any{
    window.localStorage.removeItem(ROLE);
    window.localStorage.setItem(ROLE,JSON.stringify(role));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }


  static getUser(): any{
    return JSON.parse(localStorage.getItem(ROLE));
  }

  static getUserId(): string | null {

    const user = this.getUser();
    console.log(user);
    console.log(user.userID);
    if (user == null) {
      return null;
    }
    return user.userID;
  }
  

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }


}
