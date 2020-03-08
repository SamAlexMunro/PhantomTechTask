import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksListHostComponent } from './bookmarks-list-host.component';

describe('BookmarksListHostComponent', () => {
  let component: BookmarksListHostComponent;
  let fixture: ComponentFixture<BookmarksListHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksListHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksListHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
