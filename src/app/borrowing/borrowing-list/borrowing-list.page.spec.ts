import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowingListPage } from './borrowing-list.page';

describe('BorrowingListPage', () => {
  let component: BorrowingListPage;
  let fixture: ComponentFixture<BorrowingListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowingListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
