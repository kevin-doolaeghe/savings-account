import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRepartitionChartComponent } from './balance-repartition-chart.component';

describe('BalanceRepartitionChartComponent', () => {
  let component: BalanceRepartitionChartComponent;
  let fixture: ComponentFixture<BalanceRepartitionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceRepartitionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceRepartitionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
