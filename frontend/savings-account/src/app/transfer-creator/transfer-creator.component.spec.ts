import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCreatorComponent } from './transfer-creator.component';

describe('TransferCreatorComponent', () => {
  let component: TransferCreatorComponent;
  let fixture: ComponentFixture<TransferCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
