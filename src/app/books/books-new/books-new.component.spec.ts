import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksNewComponent } from './books-new.component';

describe('BooksNewComponent', () => {
  let component: BooksNewComponent;
  let fixture: ComponentFixture<BooksNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BooksNewComponent]
    });
    fixture = TestBed.createComponent(BooksNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
