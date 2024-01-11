import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'rf-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService){}

  public loginForm: FormGroup = this.formBuilder.group({
    email:      ["", [Validators.required, Validators.email]],
    password:   ["", [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  @Output() private statusEvent: EventEmitter<string> = new EventEmitter<string>()
  
  fakeSubmit(){
    let loggedIn = this.loginService.fakeLogin({ 
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value 
    })
    
    if(loggedIn) this.statusEvent.emit("success") 
    else this.statusEvent.emit("error")
  }
  
}
