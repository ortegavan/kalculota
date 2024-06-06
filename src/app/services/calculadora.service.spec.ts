import { TestBed } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
    let service: CalculadoraService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculadoraService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate IRRF', () => {
        const result = service.calcularIrrf(6363.5);
        expect(result).toBe(95.45);
    });

    it('should calculate COFINS', () => {
        const result = service.calcularCofins(6363.5);
        expect(result).toBe(190.91);
    });

    it('should calculate PIS', () => {
        const result = service.calcularPis(6363.5);
        expect(result).toBe(41.36);
    });

    it('should calculate CSLL', () => {
        const result = service.calcularCsll(6363.5);
        expect(result).toBe(63.64);
    });
});
