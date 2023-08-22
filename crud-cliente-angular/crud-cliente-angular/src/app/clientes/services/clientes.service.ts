import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'api/clientes';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cliente[]>(this.API)
    .pipe(
      first(),
      tap(clientes => console.log(clientes))
    );
  }

  save(record: Partial<Cliente>) {
    return this.httpClient.post<Cliente>(this.API, record).pipe(first());
  }
}
