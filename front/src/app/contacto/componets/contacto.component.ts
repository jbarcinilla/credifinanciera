import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import localeColombia from '@angular/common/locales/es-CO';
import { ContactoService } from '../services/contacto.service';
import { Router } from '@angular/router';
import { Persona } from '../../shared/interfaces/Persona';

registerLocaleData(localeColombia, 'es-CO');

export const MY_FORMATS = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM-DD',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM-DD',
  },
};
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ContactoComponent implements OnInit {
  contacto: Persona;
  edit: boolean;
  public alertFunction: any;
  range: FormGroup;
  formContacto: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private contactS: ContactoService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.edit = false;
    this.contacto = navigation?.extras?.state?.value;

    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    const currentYear2 = new Date();
    this.minDate = new Date(currentYear - 2, 0, 1);
    this.maxDate = currentYear2;
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.formContacto = new FormGroup({
      nroDocumento: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      telefono: new FormControl('', [Validators.required]),
      ocupacion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (typeof this.contacto === 'undefined') {
      this.edit = false;
    } else {
      this.edit = true;
      this.formContacto.patchValue(this.contacto);
      this.formContacto.controls.nroDocumento.disable();
    }
  }
  itemclick() {
    if (this.formContacto.valid) {
      const pipe = new DatePipe('es-CO'); // Use your own locale
      const myFormattedDateI = pipe.transform(
        this.formContacto.get('fechaNacimiento').value,
        'yyyy-MM-dd'
      );
      this.formContacto.get('fechaNacimiento').setValue(myFormattedDateI);

      if (this.edit) {
        this.formContacto.controls.nroDocumento.enable();
        this.update(this.formContacto.value);
      } else {
        this.save();
      }
    }
  }

  save() {
    this.contactS.insertarPersona(this.formContacto.value).then((response) => {
      if (response.guardado) {
        this.contactS.showSuccess('Registro exitoso...', null);
      } else {
        this.contactS.showWarning('Error interno', 'Error');
      }
    });
  }

  update(contacto: Persona) {
    this.contactS.actualizarPersona(contacto).then((response) => {
      this.formContacto.controls.nroDocumento.disable();
      if (response.actualizado) {
        this.contactS.showSuccess('Actualizacion exitoso...', null);
      } else {
        this.contactS.showWarning('Error interno', 'Error');
      }
    });
  }
}
