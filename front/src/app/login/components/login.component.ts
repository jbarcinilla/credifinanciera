import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';
@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  usuario: Usuario;
  constructor(private ro: Router, private loginS: LoginService) {

    this.usuario = new Usuario('', '', false);
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.formLogin.valid) {
      this.loginS.ingresar(this.formLogin.value).then((respuesta) => {
        this.usuario= respuesta;
        if (this.usuario.estado){
          sessionStorage.setItem('estadoSessicon', 'true');
          this.ro.navigate(['app/home']);
        }
      }).catch(error => console.error(error));
    }
  }
}
