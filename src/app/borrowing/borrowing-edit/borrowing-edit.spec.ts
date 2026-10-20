import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowingEdit } from './borrowing-edit';

describe('BorrowingEdit', () => {
  let component: BorrowingEdit;
  let fixture: ComponentFixture<BorrowingEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowingEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
