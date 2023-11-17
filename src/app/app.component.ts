import { Component } from '@angular/core';
import { ContaService } from './services/conta.service';
import { Conta } from './models/conta.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'observables';

  contas: Conta[] = [];
  //form input
  id?: number;
  cliente: string = '';
  agencia: string = '';
  conta: string = '';
  saldo: number = 0;

  constructor(private contasService: ContaService) {
    this.obterContas();
  }

  obterContas() {
    return this.contasService
      .obterContas()
      .subscribe((contas) => (this.contas = contas));
  }

  cadastrarContas() {
    if (!this.cliente || !this.agencia || !this.conta || !this.saldo) {
      console.log('Preencha todos os campos');
      return;
    }

    if (this.id) {
      return this.contasService
        .atualizarContas({
          id: this.id,
          cliente: this.cliente,
          agencia: this.agencia,
          conta: this.conta,
          saldo: this.saldo,
        })
        .subscribe(() => this.obterContas());
    }

    return this.contasService
      .cadastrarContas({
        cliente: this.cliente,
        agencia: this.agencia,
        conta: this.conta,
        saldo: this.saldo,
      })
      .subscribe(() => this.obterContas());
  }

  deletarContas(id: number) {
    return this.contasService
      .deletarContas(id)
      .subscribe(() => this.obterContas());
  }

  preencherCampos(conta: Conta) {
    this.id = conta.id;
    this.agencia = conta.agencia;
    this.conta = conta.conta;
    this.cliente = conta.cliente;
    this.saldo = conta.saldo;
  }
}
