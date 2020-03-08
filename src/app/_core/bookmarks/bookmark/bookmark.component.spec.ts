import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkComponent } from './bookmark.component';
import { BookmarkService } from '../_services/bookmark.service';

describe('BookmarkComponent', () => {
  let component: BookmarkComponent;
  let fixture: ComponentFixture<BookmarkComponent>;
  const mockBookmarkService = {
    deleteBookmark: () => {

    },
    editBookmark: () => {

    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkComponent],
      providers: [
        {
          provide: BookmarkService, useValue: mockBookmarkService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkComponent);
    component = fixture.componentInstance;
    component.bookmark = {
      url: 'test',
      id: '0',
      note: 'note',
      edit: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('enableDelete', () => {
    it('Should set showDelete to true', () => {
      component.enableDelete();
      expect(component.showDelete).toBeTrue();
    });
  });

  describe('cancelDelete', () => {
    it('Should set showDelete to false', () => {
      component.cancelDelete();
      expect(component.showDelete).toBeFalse();
    });
  });

  describe('updateBookmark', () => {
    it('Should set showEdit to false, and invoke bookmarkService.editBookmark once', () => {
      spyOn(mockBookmarkService, 'editBookmark');
      component.updateBookmark(component.bookmark);
      expect(component.bookmark.edit).toBeFalse();
      expect(mockBookmarkService.editBookmark).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteBookmark', () => {
    it('Should invoked bookmarkService.deleteBookmark once', () => {
      spyOn(mockBookmarkService, 'deleteBookmark');
      component.deleteBookmark('0');
      expect(mockBookmarkService.deleteBookmark).toHaveBeenCalledTimes(1);
    });
  });

  describe('enableEdit', () => {
    it('Should set the bookmark edit to true, and the showDelete to false', () => {
      component.enableEdit(component.bookmark);
      expect(component.bookmark.edit).toBeTrue();
      expect(component.showDelete).toBeFalse();
    });
  });

});
