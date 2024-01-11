import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

  fakeLogin(login: {email: string, password: string }){
    const email = "teste@gmail.com"
    const password = "123456789"
    if(login.email == email && login.password == password ){
      console.log("you are logged in")
      return true
    }

    else{ 
      console.log("you are not logged in")
      return false
    }
  }
}
