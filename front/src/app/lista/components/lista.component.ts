import { Persona } from '../../shared/interfaces/Persona';
import { ListaService } from '../services/lista.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
let ELEMENT_DATA: Persona[] = [];
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  public displayedColumns: string[] = ['posicion','nroDocumento', 'nombre', 'apellido', 'fechaNacimiento', 'ciudad',
    'correoElectronico', 'telefono', 'ocupacion', 'accion'];
     dataSource = new MatTableDataSource<Persona>(ELEMENT_DATA);
 

  constructor(private personasServices: ListaService, private router: Router, private sharedServices: SharedService) {
    this.personasServices.getListaPersonas().then((respuesta) => {
      console.log('respuesta: ', respuesta);
      ELEMENT_DATA = respuesta;
      ELEMENT_DATA.forEach( (currentValue, index) => {
        currentValue.posicion=index+1;
      });
      console.log('ELEMENT_DATA: ', ELEMENT_DATA);
    }).catch(error => console.error(error));
  }

  ngOnInit() {
 
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onGoToEdit(item: Persona): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['app/contact'], this.navigationExtras);
  }

  see(item: Persona): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['app/details'], this.navigationExtras);
  }

  delete(item: Persona){
    this.sharedServices.itemclickDelete(item.nroDocumento);
    ELEMENT_DATA= ELEMENT_DATA.filter((item2: Persona) => item2.nroDocumento !== item.nroDocumento);
    this.dataSource = new MatTableDataSource<Persona>(ELEMENT_DATA);
  }

}




