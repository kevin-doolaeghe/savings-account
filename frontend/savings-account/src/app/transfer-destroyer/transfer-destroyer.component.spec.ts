import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDestroyerComponent } from './transfer-destroyer.component';

describe('TransferDestroyerComponent', () => {
  let component: TransferDestroyerComponent;
  let fixture: ComponentFixture<TransferDestroyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferDestroyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDestroyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
