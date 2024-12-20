import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, CurrencyPipe, registerLocaleData } from '@angular/common';
import { CalculadoraService } from '../../services/calculadora.service';
import { Imposto } from '../../models/imposto.model';
import localePt from '@angular/common/locales/pt';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

registerLocaleData(localePt);

@Component({
    selector: 'app-nf',
    imports: [
        ReactiveFormsModule,
        InputNumberModule,
        ButtonModule,
        CurrencyPipe,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, DecimalPipe],
    templateUrl: './nf.component.html',
    styleUrl: './nf.component.css'
})
export class NfComponent implements OnInit {
    fb = inject(FormBuilder);
    service = inject(CalculadoraService);
    decimalPipe = inject(DecimalPipe);

    form!: FormGroup;
    imposto = {} as Imposto;
    aReceber = 0;
    descricao = '';

    ngOnInit(): void {
        this.form = this.fb.group({
            valor: '',
        });
    }

    converter(valor: number) {
        return this.decimalPipe.transform(valor, '1.2-2') || '0,00';
    }

    copiarDescricao() {
        navigator.clipboard.writeText(this.descricao.replaceAll('<br>', ''));
    }

    copiarAReceber() {
        navigator.clipboard.writeText(this.converter(this.aReceber));
    }

    limpar() {
        this.form.setValue({ valor: '0' });
        this.imposto = {} as Imposto;
        this.aReceber = 0;
        this.descricao = '';
    }

    calcular() {
        if (this.form.valid) {
            const valor = this.form.controls['valor'].value;

            this.imposto.irrf = this.service.calcularIrrf(valor);
            this.imposto.pis = this.service.calcularPis(valor);
            this.imposto.cofins = this.service.calcularCofins(valor);
            this.imposto.csll = this.service.calcularCsll(valor);
            this.imposto.total = this.service.somar([
                this.imposto.irrf,
                this.imposto.pis,
                this.imposto.cofins,
                this.imposto.csll,
            ]);

            this.aReceber = this.service.arredondar(valor - this.imposto.total);

            this.descricao = `Prestacao de servicos de elaboracao de programas de computador (software) em projetos de informatica, conforme contrato.<br><br>

IRRF Art. 647 RIR/99<br>
IRRF (1,50%): R$ ${this.converter(this.imposto.irrf)}<br>
Imp. Lei 10833/03 Art. 30<br>
PIS (0,65%): R$ ${this.converter(this.imposto.pis)}<br>
COFINS (3,00%): R$ ${this.converter(this.imposto.cofins)}<br>
CSLL (1,00%): R$ ${this.converter(this.imposto.csll)}<br><br>

Nao sujeito a retencao de INSS conforme IN SRP 03 de 14/07/2005 - Decreto 3048/99 e alteracoes.`;
        }
    }
}
