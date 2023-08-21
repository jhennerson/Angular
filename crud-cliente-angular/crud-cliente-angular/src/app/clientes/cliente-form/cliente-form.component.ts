import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ClientesService) {
    this.form = this.formBuilder.group({
      nome: [null],
      email: [null],
      telefone: [null]
    });
  }

  onSubmit() {

  }

  onCancel() {

  }

  ngOnInit(): void {
  }
}
