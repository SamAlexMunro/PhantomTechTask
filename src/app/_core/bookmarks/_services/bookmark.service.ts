import { demoData } from './bookmarkDemoData';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  public bookmarkCacheKey = 'phantomBookmarks';
  private bookmarks$ = new BehaviorSubject<Bookmark[]>(this.checkLocalStorage() ? JSON.parse(localStorage[this.bookmarkCacheKey]) : []);

  constructor() {
  }

  /**
   * For demo purposes only!
   */
  public populateWithData() {
    this.bookmarks$.next(demoData);
  }

  /**
   * Returns bookmark observable.
   */
  public get getBookmarks(): BehaviorSubject<Bookmark[]> {
    return this.bookmarks$;
  }

  /**
   * Adds a new bookmark to the bookmarks$ using spread method.
   */
  public addBookmark(bookmark: Bookmark): void {
    this.bookmarks$.next([bookmark, ...this.bookmarks$.getValue()]);
  }

  /**
   * Edits an existing bookmark if the id matches one in the current observable,
   * and updates the bookmarks$ with the spread method.
   */
  public editBookmark(bookmarkId: string, updatedBookmark: Bookmark): void {
    this.bookmarks$.getValue().forEach((bookmark, index) => {
      if (bookmark.id === bookmarkId) {
        this.bookmarks$.getValue()[index].url = updatedBookmark.url;
        this.bookmarks$.getValue()[index].note = updatedBookmark.note;
        return;
      }
    });
    this.bookmarks$.next([...this.bookmarks$.getValue()]);
  }

  /**
   * Deletes a bookmark from the bookmarks$ if the id matches,
   * and updates with the spread method.
   */
  public deleteBookmark(bookmarkId: string): void {
    this.bookmarks$.getValue().find((bookmark, index) => {
      if (bookmark.id === bookmarkId) {
        this.bookmarks$.getValue().splice(index, 1);
        return -1;
      }
    });
    this.bookmarks$.next([...this.bookmarks$.getValue()]);
  }

  /**
   * Determines the starting state for the bookmarks$ by checking whether there is
   * anything within the localStorage under that the service bookmarkCacheKey
   */
  private checkLocalStorage(): boolean {
    if (localStorage[this.bookmarkCacheKey]) {
      if (localStorage[this.bookmarkCacheKey].length) {
        return true;
      }
    }
    return false;
  }
}

export interface Bookmark {
  url: string;
  note: string;
  edit: boolean;
  id: string;
}
