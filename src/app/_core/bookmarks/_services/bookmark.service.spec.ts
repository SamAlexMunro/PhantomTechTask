import { demoData } from './bookmarkDemoData';
import { TestBed } from '@angular/core/testing';

import { BookmarkService, Bookmark } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  const startingData = [
    {
      url: 'testData.com',
      note: 'test',
      edit: false,
      id: '1'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkService);
  });

  afterEach(() => {
    localStorage[service.bookmarkCacheKey] = JSON.stringify(startingData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBookmarks', () => {
    it('Should return the bookmarks observable with a value stored in localStorage', () => {
      localStorage[service.bookmarkCacheKey] = JSON.stringify(startingData);
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(startingData);
      });
      service.getBookmarks.unsubscribe();
    });
  });

  describe('addBookmark', () => {
    it('Should add a new bookmark', () => {
      const expectedData = [
        {
          url: 'Test',
          note: '',
          edit: false,
          id: '2'
        },
        {
          url: 'testData.com',
          note: 'test',
          edit: false,
          id: '1'
        }
      ];
      service.addBookmark({ url: 'Test', note: '', edit: false, id: '2' });
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(expectedData);
      });
      service.getBookmarks.unsubscribe();
    });
  });

  describe('editBookmark', () => {
    it('Should update the selected bookmark with the new input values', () => {
      const expectedData = [
        {
          url: 'newUrl.com',
          note: 'newNote',
          edit: false,
          id: '1'
        },
      ];
      service.editBookmark('1', { url: 'newUrl.com', note: 'newNote', edit: false, id: '1' });
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(expectedData);
      });
      service.getBookmarks.unsubscribe();
    });

    it(`Should do nothing if the id doesn't match`, () => {
      service.editBookmark('3', { url: 'badId.com', note: 'badId', edit: false, id: '1' });
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(startingData);
      });
      service.getBookmarks.unsubscribe();
    });
  });

  describe('deleteBookmark', () => {
    it('Should delete the bookmark at a given index via the id', () => {
      service.deleteBookmark('1');
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual([]);
      });
      service.getBookmarks.unsubscribe();
    });
    
    it(`Should do nothing if if the id doesn't match`, () => {
      service.deleteBookmark('3');
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(startingData);
      });
      service.getBookmarks.unsubscribe();
    });
  });



  describe('populateWithData', () => {
    it('Should populate with data', () => {
      service.populateWithData();
      service.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
        expect(bookmarks).toEqual(demoData);
      });
      service.getBookmarks.unsubscribe();
    });
  });
});
