import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksListComponent } from './bookmarks-list.component';
import { BookmarkService } from '../_services/bookmark.service';

describe('BookmarksListComponent', () => {
  let component: BookmarksListComponent;
  let fixture: ComponentFixture<BookmarksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
