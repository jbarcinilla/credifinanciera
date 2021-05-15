import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista.component';
import { ListaRoutingModule } from './lista-routing.module';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ListaService } from './services/lista.service';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule

  ],
  exports: [
    ListaComponent
  ],
  providers:[ListaService]
})
export class ListaModule { }
