import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCurveComponent } from './balance-curve.component';

describe('BalanceCurveComponent', () => {
  let component: BalanceCurveComponent;
  let fixture: ComponentFixture<BalanceCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceCurveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
