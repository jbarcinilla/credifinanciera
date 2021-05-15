import { Injectable } from '@angular/core';
import { Persona } from '../../shared/interfaces/Persona';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private toastr: ToastrService) { }

  public async insertarPersona(persona: Persona){
    const options = {
      method: 'POST',
      body: JSON.stringify(persona),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
    const response= await fetch(environment.url + 'servicios/regPersona', options);
    return await response.json();
  }

  public async actualizarPersona(persona: Persona){
    const options = {
      method: 'POST',
      body: JSON.stringify(persona),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
   const response = await fetch(environment.url + 'servicios/actualizar', options);
    return await response.json();
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
