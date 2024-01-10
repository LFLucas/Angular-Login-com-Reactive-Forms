# ReactiveForms

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versao 17.0.8.

## Rodando o Projeto

* Clone o projeto 
> git clone [link do projeto]

* Instale as dependencias
> npm install

* inicie o servidor de desenvolvimento
> ng serve


## O Projeto
(Ese projeto foi construido usando NgModules, componentes standalone serao abordados posteriormente)

Reactive forms sao formularios construidos na classe do componente e conectado aos elementos html atravez de diretivas e atriubutos permitindo com que tenhamos mais flexibilidade nas validaçoes comparaçoes etc.

* declare ou importe o componente que vai conter o formulario no modulo principal da aplicaçao

* importe o modulo ReactFormsModule no modulo onde o componente esta declarado ou importado

*app.module.ts*
```typescript

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Importação do Modulo no arquivo
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';

// Importação da diretiva  no arquivo
import { TrackStatusDirective } from './directives/track-status.directive';

@NgModule({

    // declaration: declara os modulos componentes diretivas etc que exitem dentro
    //              deste mesmo modulo
  declarations: [
    AppComponent,
    LoginFormComponent, // declaraçao do componente que receberá o formulario
    TrackStatusDirective,  // Diretiva que muda a classe dos elementos de acordo com o status

  ],
  // imports: importa componentes diretivas modulos 
  //          etc externos para que usemos seus recursos
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule   // Importação do ReactiveFormsModule dentro do modulo
  ],

  // providers: adiciona Providers ao modulo
  //            Providers serao abordados posteriormente
  providers: [],

  // bootstrap: array de componentes que serao renderizados 
  //            pelo angular diretamente no DOM 
  //            geralmente somente o AppModule usa essa propriedade
  //            pois ela carrega o componente de bootstrap
  //            que e um componente que carrega todos os outros
  bootstrap: [AppComponent]
})
export class AppModule { }

```

* declare o componente que contem o formulario no arquivo html do componente root para que ele seja exibido

*app.module.ts*
```html
<rf-login-form rfTrackStatus/>  
```

* crie o formulario na classe do componente 

*login-form.component.ts*
```typescript
import { Component, 
         EventEmitter, // importaçao do EventEmitter 
         Output,       // importaçao do decorator @Output() para a emissao do evento
} from '@angular/core';

import { FormBuilder,   // importaçao do service FormBuilder
         FormGroup,     // importaçao do FormGroup
         Validators     // importaçao dos Validators
} from '@angular/forms';

@Component({
  selector: 'rf-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // injeçao do serviço formBuilder
  constructor(private formBuilder: FormBuilder){}


  // criaçao do formulario
  public loginForm: FormGroup = this.formBuilder.group({
    email:      ["", [Validators.required, Validators.email]],
    password:   ["", [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  // instanciaçao do evento que emitira o valor da classe a ser adicionada no elemento
  // usada para fazer o formulario mudar de cor de acordo com o status
  @Output() private statusEvent: EventEmitter<string> = new EventEmitter<string>()
  
  // funçao que realiza um login falso somente para
  // testar o conceito de Reactive Forms
  fakeSubmit(){
    //exibe os valores dos inputs email password e rememberMe
    console.log(this.loginForm.controls['email'].value)
    console.log(this.loginForm.controls['password'].value)
    console.log(this.loginForm.controls['rememberMe'].value)

    // credenciais falsas para teste
    const email = "teste@gmail.com"
    const password = "123456789"

    // se o email e a password forem validos
    // exibe mensagem no console e emite o valor "success"
    if( this.loginForm.controls['email'].value == email &&
        this.loginForm.controls['password'].value == password ){
      console.log("you are logged in")
      this.statusEvent.emit("success")
    }
    // se o email e a password forem invalidos
    // exibe mensagem no console e emite o valor "error"
    else{
      console.log("you are not logged in")
      this.statusEvent.emit("error")
    }
  }
}

```

* Atribua o loginForm criado a propriedade formGroup no elemento form no html

* Atribua seus campos aos inputs no html com a diretiva formControlName

```html
<h2>Login</h2>
<form [formGroup]="loginForm" (ngSubmit)="fakeSubmit()">

    <span class="m-input">
        <input type="email" id="email" placeholder="" formControlName="email"> 
        <label for="email">Email</label>
    </span>
    
    <span class="m-input">
        <input type="password" id="password" placeholder="" formControlName="password"> 
        <label for="password">Password</label>
    </span>
    
    <span class="m-input">
        <input type="checkbox" id="remember-me" formControlName="rememberMe"> 
        <label for="remember-me">Remember-Me</label>
    </span>

    <a href="#">Forgot Password?</a>

    <button type="submit" [disabled]="loginForm.invalid">Log In</button>
    <span class="message"></span>

</form>
```

Para criar um formulario usando o serviço FormBuilder, inserimos dentro do metodo
this.formBuilder.group um objeto contendo os campos do formulario que deseja. Esse objeto deve conter chaves que farao referencia a string passada para a diretiva formControlName no elemento input dentro do arquivo html (a string passada para a diretiva deve ser exatamente igual a chave daquele determinado campo)

Cada chave pode receber um valor em string number ou boolean mas tambem pode receber um array contendo
um valor que como dito anteriormente, tambem pode ser string number ou boolean acompanhado de um validator ou um array de validators assincronos (validators serao abordados posteriormente) 

O evento (ngSubmit) na tag forms faz com que toda vez que o botao for clicado, se ele estiver habilitado, ele executara a funçao fakeLogin()

A execuçao dessa funçao dispara um evento que sera ouvido pela diretiva rfTrackStatus. Esse evento envia o status do componente para a diretiva que faz com que a classe do elemento mude de acordo com o seu status fazendo com que a cor dos elementos mude para vermelho quando o login esta invalido e verde para quando esta correto