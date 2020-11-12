import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup}  from '@angular/forms';

import {AutenticacionService} from '../servicios/autenticacion.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authServ: AutenticacionService
  ) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group(
      {
        userName:'',
        password:''
      }
    );
  }

 
  Loguear(){
 let usuarioFormulario: User=Object.assign({},this.loginForm.value);

    this.authServ.login(usuarioFormulario.userName,usuarioFormulario.password)
      .subscribe(
        resultado=> console.log(resultado),
        error=> console.log("Error" + error),
      )
  }

}
