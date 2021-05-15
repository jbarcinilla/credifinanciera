import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/shared/interfaces/Persona';
import { SharedService } from '../../shared/services/shared.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  contacto: Persona;
  formDetail: FormGroup;
  constructor(private router: Router, private sharedServices: SharedService) {
    const navigation = this.router.getCurrentNavigation();
    this.contacto = navigation?.extras?.state?.value;

    this.formDetail = new FormGroup({
      nroDocumento: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      ciudad: new FormControl(''),
      correoElectronico: new FormControl(''),
      telefono: new FormControl(''),
      ocupacion: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (typeof this.contacto === 'undefined') {
      this.router.navigate(['app/home']);
    } else {
      this.formDetail.patchValue(this.contacto);
      this.formDetail.disable();
    }
  }

  itemclickEdit() {
    this.navigationExtras.state.value = this.contacto;
    this.router.navigate(['app/contact'], this.navigationExtras);
  }

  itemclickDelete() {
    this.sharedServices.itemclickDelete(this.contacto.nroDocumento);
  }

}
