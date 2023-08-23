import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FormUtilsService } from 'src/app/shared/services/form-utils.service';

import { Cliente } from '../../model/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit{

  form = this.formBuilder.group({
    id: [''],
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.pattern('[- +()0-9]{9,}'), Validators.minLength(11)]]
  })

  constructor(private formBuilder: NonNullableFormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private service: ClientesService,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService) {
  }

  ngOnInit(): void {
    const cliente: Cliente = this.route.snapshot.data['cliente'];
    this.form.setValue({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone
    });
  }

  onSubmit() {
    if(this.form.valid) {
      this.service.save(this.form.value as Cliente).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Cliente salvo com sucesso!', 'X', {duration: 2000});
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao salvar Cliente.'
    });
  }

  getErrorMessage(fieldName: string) {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }
}
