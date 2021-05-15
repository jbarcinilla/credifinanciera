import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public async ingresar(u: Usuario) {
    const options = {
      method: 'POST',
      body: JSON.stringify(u),
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        
      }),
    };
    const response = await fetch(environment.url + 'login/getUsuario', options);
    return await response.json();
  }
}
