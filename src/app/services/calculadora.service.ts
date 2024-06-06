import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CalculadoraService {
    public calcularIrrf(valor: number): number {
        return this.arredondar(valor * 0.015);
    }

    public calcularCofins(valor: number): number {
        return this.arredondar(valor * 0.03);
    }

    public calcularPis(valor: number): number {
        return this.arredondar(valor * 0.0065);
    }

    public calcularCsll(valor: number): number {
        return this.arredondar(valor * 0.01);
    }

    public somar(params: number[]): number {
        return this.arredondar(params.reduce((a, b) => a + b, 0));
    }

    public arredondar(valor: number): number {
        return Math.round((valor + Number.EPSILON) * 100) / 100;
    }
}
