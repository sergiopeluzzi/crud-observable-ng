import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conta } from '../models/conta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  url = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) {}

  obterContas() {
    return this.http.get<Conta[]>(this.url);
  }

  cadastrarContas(conta: Conta) {
    return this.http.post<Conta>(this.url, conta);
  }

  atualizarContas(conta: Conta) {
    return this.http.put<Conta>(`${this.url}/${conta.id}`, conta);
  }

  deletarContas(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
