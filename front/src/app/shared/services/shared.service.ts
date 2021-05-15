import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastr: ToastrService, private router: Router) { }

  public async eliminarPersona(nroDocumento: string) {
    const options = {
      method: 'DELETE',
      body: nroDocumento,
      headers: new Headers({
        'content-type': 'text/plain',
      }),
    };
    const response=await fetch(environment.url + 'servicios/eliminar', options);
    return await response.json();
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  itemclickDelete(nroDoc: string, ) {
    console.log('nroDoc: ', nroDoc)
    this.eliminarPersona(nroDoc).then((response) => {
      console.log('itemclickDelete: ', response);
      if (response.eliminado) {
        this.showSuccess('Registro eliminado...', null);
        this.router.navigate(['app/list']);
      } else {
        this.showWarning('Error interno', 'Error');
      }
    });
  }
}
