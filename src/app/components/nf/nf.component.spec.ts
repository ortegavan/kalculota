import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NfComponent } from './nf.component';

describe('NfComponent', () => {
    let component: NfComponent;
    let fixture: ComponentFixture<NfComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NfComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate', () => {
        component.ngOnInit();
        component.form.controls['valor'].setValue(100);
        component.calcular();
        expect(component.imposto.irrf).toBe(1.5);
        expect(component.imposto.pis).toBe(0.65);
        expect(component.imposto.cofins).toBe(3);
        expect(component.imposto.csll).toBe(1);
        expect(component.imposto.total).toBe(6.15);
    });
});
