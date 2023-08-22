import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './containers/clientes/clientes.component';
import { ClienteFormComponent } from './containers/cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';

@NgModule({
  declarations: [
    ClientesComponent,
    ClienteFormComponent,
    ClientesListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
