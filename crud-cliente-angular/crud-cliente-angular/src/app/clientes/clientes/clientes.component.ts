import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { ClientesService } from '../services/clientes.service';
import { Cliente } from './../model/cliente';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Cliente[]>;
  displayedColumns = ['id', 'nome', 'email', 'telefone', 'operacoes'];

  constructor(private clienteService: ClientesService, public dialog: MatDialog) {
    this.clientes$ = this.clienteService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar clientes!');
        return of ([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
