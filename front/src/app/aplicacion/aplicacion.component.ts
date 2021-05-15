import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuListItem } from './models/matmenulistitem';
@Component({
  selector: 'app-menu',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})

export class AplicacionComponent implements OnInit {

  menuListItems: MatMenuListItem[];
  constructor(private ro: Router) {
  }

  ngOnInit(): void {
  }


  clickMenuItem(valor: string) {
    switch (valor) {
      case 'Logout':
        sessionStorage.clear();
        this.ro.navigate(['']);
        break;
      case 'Contact':
        this.ro.navigate(['app/contact']);
        break;
      case 'List':
        this.ro.navigate(['app/list']);
        break;
      case  'Home' :
        this.ro.navigate(['app/home']);
        break;

    }


  }

}
