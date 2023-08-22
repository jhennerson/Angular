import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit{

  @Input() clientes: Cliente[] = [];
  readonly displayedColumns = ['id', 'nome', 'email', 'telefone', 'operacoes'];

  constructor() {

  }

  ngOnInit(): void {

  }
}
