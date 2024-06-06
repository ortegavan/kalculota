import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfComponent } from './nf.component';

describe('NfComponent', () => {
  let component: NfComponent;
  let fixture: ComponentFixture<NfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
