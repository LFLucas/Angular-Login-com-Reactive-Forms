import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rf-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private formBuilder: FormBuilder){}

  public loginForm: FormGroup = this.formBuilder.group({
    email:      ["", [Validators.required, Validators.email]],
    password:   ["", [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  @Output() private statusEvent: EventEmitter<string> = new EventEmitter<string>()
  
  fakeSubmit(){
    console.log(this.loginForm.controls['email'].value)
    console.log(this.loginForm.controls['password'].value)
    console.log(this.loginForm.controls['rememberMe'].value)

    const email = "teste@gmail.com"
    const password = "123456789"

    if( this.loginForm.controls['email'].value == email &&
        this.loginForm.controls['password'].value == password ){
      console.log("you are logged in")
      this.statusEvent.emit("success")
    }else{
      console.log("you are not logged in")
      this.statusEvent.emit("error")
    }
  }
}
