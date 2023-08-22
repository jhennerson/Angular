import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ClientesService,
    private location: Location,) {
    this.form = this.formBuilder.group({
      nome: [null],
      email: [null],
      telefone: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSuccess());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.onCancel();
  }

  ngOnInit(): void {
  }
}
