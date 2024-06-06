import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CalculadoraService } from '../../services/calculadora.service';
import { Imposto } from '../../models/imposto.model';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
    selector: 'app-nf',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NgxCurrencyDirective,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, DecimalPipe],
    templateUrl: './nf.component.html',
    styleUrl: './nf.component.css',
})
export class NfComponent implements OnInit {
    fb = inject(FormBuilder);
    service = inject(CalculadoraService);
    decimalPipe = inject(DecimalPipe);

    form!: FormGroup;
    imposto = {} as Imposto;

    ngOnInit(): void {
        this.form = this.fb.group({
            valor: ['', [Validators.required]],
            aReceber: [''],
            aPagar: [''],
            descricao: [''],
        });
    }

    converter(valor: number) {
        return this.decimalPipe.transform(valor, '1.2-2');
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

            this.form.patchValue({
                aReceber: this.service.arredondar(valor - this.imposto.total),
                aPagar: this.imposto.total,
                descricao: `Prestacao de servicos de elaboracao de programas de computador (software) em projetos de informatica, conforme contrato.

IRRF Art. 647 RIR/99
IRRF (1,50%): R$ ${this.converter(this.imposto.irrf)}
Imp. Lei 10833/03 Art. 30
PIS (0,65%): R$ ${this.converter(this.imposto.pis)}
COFINS (3,00%): R$ ${this.converter(this.imposto.cofins)}
CSLL (1,00%): R$ ${this.converter(this.imposto.csll)}

Nao sujeito a retencao de INSS conforme IN SRP 03 de 14/07/2005 - Decreto 3048/99 e alteracoes.`,
            });
        }
    }
}
