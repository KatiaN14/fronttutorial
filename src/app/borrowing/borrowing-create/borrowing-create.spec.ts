import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowingCreate } from './borrowing-create';

describe('BorrowingCreate', () => {
  let component: BorrowingCreate;
  let fixture: ComponentFixture<BorrowingCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowingCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
