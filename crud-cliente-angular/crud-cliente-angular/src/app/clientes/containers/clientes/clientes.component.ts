import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Cliente } from '../../model/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Cliente[]>;

  constructor(private clienteService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
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

  onEdit(cliente: Cliente) {
    console.log(cliente);
    this.router.navigate(['edit', cliente._id], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
}
