# ReactiveForms

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.0.8.

## Rodando o Projeto localmente

* Clone o projeto 
> git clone https://github.com/LFLucas/Angular-Login-com-Reactive-Forms

* Instale as dependências
> npm install

* Inicie o servidor de desenvolvimento
> ng serve

## Link do Github Pages
[Reactive Forms](https://lflucas.github.io/Angular-Login-com-Reactive-Forms/)
## O Projeto
(Este projeto foi construído usando NgModule's, componentes standalone serão abordados posteriormente)

Para ver as mudanças na pagina o login correto para se usar é:
> email: teste@gmail.com

> password: 123456789

Reactive forms são formulários construídos na classe do componente e conectado aos elementos html através de diretivas e atributos, permitindo com que tenhamos mais flexibilidade nas validações, comparações, etc.

* declare ou importe o componente que vai conter o formulário no módulo principal da aplicação

* importe o modulo ReactFormsModule no módulo onde o componente está declarado ou importado

*app.module.ts*
```typescript

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Importação do Módulo no arquivo
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';

// Importação da diretiva no arquivo
import { TrackStatusDirective } from './directives/track-status.directive';

@NgModule({

    // declarations: declara os módulos, componentes, diretivas, etc, que exitem dentro
    //              deste mesmo modulo
  declarations: [
    AppComponent,
    LoginFormComponent, // Declaração do componente que receberá o formulário
    TrackStatusDirective,  // Diretiva que muda a classe dos elementos conforme o status do formulário
  ],

  // imports: importa componentes diretivas módulos 
  //          etc externos para usarmos seus recursos
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule   // Importação do ReactiveFormsModule dentro do módulo
  ],

  // providers: adiciona Providers ao modulo
  //            Providers serao abordados posteriormente
  providers: [],

  // bootstrap: array de componentes que serão renderizados 
  //            pelo angular diretamente no DOM 
  //            geralmente somente o AppModule usa essa propriedade,
  //            pois ela carrega o componente de Bootstrap
  //            que é um componente que carrega todos os outros
  bootstrap: [
    AppComponent // Componente raíz da aplicação
  ]
})
export class AppModule { } // Modulo raíz da aplicação

```

* Declare o componente que contem o formulário no arquivo html do componente root para que ele seja exibido

*app.component.html*
```html
<rf-login-form rfTrackStatus/>  
```
> A diretiva rfTrackStatus modifica as classes do elemento conforme o status do formulário
* Crie o formulário na classe do componente 

*login-form.component.ts*
```typescript
import { Component, 
         EventEmitter, // Importação do EventEmitter 
         Output,       // Importação do decorator @Output() para a emissão do evento
} from '@angular/core';

import { FormBuilder,   // Importação do service FormBuilder
         FormGroup,     // Importação do FormGroup
         Validators     // Importação dos Validators
} from '@angular/forms';

@Component({
  selector: 'rf-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // Injeção do serviço FormBuilder
  // Injeção do serviço LoginService (Services serão abordados posteriormente)
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService){}


  // Criação do formulário
  public loginForm: FormGroup = this.formBuilder.group({
    email:      ["", [Validators.required, Validators.email]],
    password:   ["", [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  // Instanciação do evento que emitira o valor da classe a ser adicionada no elemento
  // usada para fazer o formulário mudar de cor conforme o status
  @Output() private statusEvent: EventEmitter<string> = new EventEmitter<string>()
  
  // Função que realiza um login falso somente para
  // testar o conceito de Reactive Forms
 fakeSubmit(){
    // O serviço loginService retorna true ou false dependendo
    // do sucesso ou fracasso do login
    let loggedIn = this.loginService.fakeLogin({ 
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value 
    })
    
    // Se logar com sucesso o statusEvent emite o valor "success"
    if(loggedIn) this.statusEvent.emit("success") 

    // Senão e statusEvent emite o valor "error"
    else this.statusEvent.emit("error")
  }
}

```

* Atribua o loginForm criado a propriedade formGroup no elemento form no html

* Atribua seus campos aos inputs no html com a diretiva formControlName

*login-form.component.html*
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

Para criar um formulário usando o serviço FormBuilder, inserimos dentro do método
this.formBuilder.group() um objeto contendo os campos do formulário que deseja. Esse objeto deve conter chaves que farão referencia a string passada para a diretiva formControlName no elemento input dentro do arquivo html (a string passada para a diretiva deve ser exatamente igual à chave daquele determinado campo)

Cada chave pode receber um valor em string, number ou boolean, mas também pode receber um array contendo um valor que, como dito anteriormente, também pode ser string, number ou boolean acompanhado de um validator, ou um array de validators assíncronos (validators serão abordados posteriormente) 

O evento (ngSubmit) na tag forms faz com que toda vez que o botão for clicado, se ele estiver habilitado, ele executara a função fakeLogin()

A execução dessa função dispara um evento que será ouvido pela diretiva rfTrackStatus. Esse evento envia o status do componente para a diretiva que faz com que a classe do elemento mude conforme o seu status fazendo com que a cor dos elementos mude para vermelho quando o login esta invalido e verde quando está correto
