import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor() { }

  public async getListaPersonas() {
    const options = {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
    const response = await fetch(environment.url + 'servicios/lstPersona', options);
    return await response.json();
  }
}
