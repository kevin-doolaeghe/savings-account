import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceStatsComponent } from './balance-stats.component';

describe('BalanceStatsComponent', () => {
  let component: BalanceStatsComponent;
  let fixture: ComponentFixture<BalanceStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
