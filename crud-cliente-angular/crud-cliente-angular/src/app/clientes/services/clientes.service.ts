import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, of, tap } from 'rxjs';

import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'api/clientes';
  private cache: Cliente[] = [];

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(this.API)
    .pipe(
      first(),
      tap(clientes => console.log(clientes))
    );
  }

  loadById(id: string) {
    if (this.cache.length > 0) {
      const record = this.cache.find(cliente => `${cliente._id}` === `${id}`);
      return record != null ? of(record) : this.getById(id);
    }
    return this.getById(id);
  }

  private getById(id: string) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Partial<Cliente>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private update(record: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.API}/${record._id}`, record).pipe(first());
  }

  private create(record: Partial<Cliente>) {
    return this.http.post<Cliente>(this.API, record).pipe(first());
  }
}
