import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent{

  @Input() clientes: Cliente[] = [];
  @Output() edit: EventEmitter<Cliente> = new EventEmitter(false);
  @Output() remove: EventEmitter<Cliente> = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'email', 'telefone', 'operacoes'];

  onEdit(cliente: Cliente) {
    this.edit.emit(cliente);
  }

  onDelete(cliente: Cliente) {
    this.remove.emit(cliente);
  }
}
