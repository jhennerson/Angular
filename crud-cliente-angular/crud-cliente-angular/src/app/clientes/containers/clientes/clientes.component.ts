import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Cliente } from '../../model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Cliente[]> | null = null;

  constructor(private clientesService: ClientesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {
    this.refresh();
  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['edit', cliente.id], { relativeTo: this.route });
  }

  onRemove(cliente: Cliente) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Realmente deseja remover esse cliente?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.clientesService.remove(cliente.id).subscribe(
          success => {
            this.snackBar.open('Cliente removido com sucesso!', '', {duration: 2000});
            this.refresh();
          },
          error => this.onError('Erro ao tentar remover curso!')
        );
      }
    });
  }

  refresh() {
    this.clientes$ = this.clientesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar clientes!');
        return of ([])
      })
    );
  }
}
