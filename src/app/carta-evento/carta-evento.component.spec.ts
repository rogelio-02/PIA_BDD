import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaEventoComponent } from './carta-evento.component';

describe('CartaEventoComponent', () => {
  let component: CartaEventoComponent;
  let fixture: ComponentFixture<CartaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
