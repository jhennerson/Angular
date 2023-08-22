import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent{

  @Input() clientes: Cliente[] = [];
  @Output() edit: EventEmitter<Cliente> = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'email', 'telefone', 'operacoes'];

  onEdit(cliente: Cliente) {
    console.log(cliente);
    this.edit.emit(cliente);
  }

  ngOnInit(): void {
  }
}
