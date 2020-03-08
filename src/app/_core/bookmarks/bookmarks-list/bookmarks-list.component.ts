import { Pagination } from './../../pagination/classes/pagination';
import { BookmarkService } from './../_services/bookmark.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bookmark } from '../_services/bookmark.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'phantom-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  paginatedData: any;
  pagination: Pagination;
  paginatedBookmarks: any;
  pageNumbers: number[];

  constructor(
    private readonly bookmarkService: BookmarkService,
  ) {
    this.pagination = new Pagination(5);
  }

  ngOnInit(): void {
    this.getBookmarks();
    this.getPaginatedData();
    this.getPages();
  }

  /**
   * Demo method to generate some HREF links saves you some time!
   */
  public generateData() {
    this.bookmarkService.populateWithData();
  }

  /**
   * Gets the bookmarks from the bookmark service, and then sends that information along
   * to the pagination service, alternatively if pagination wasn't be used or being provided
   * by the backend you can just use this function directly to iterate the template.
   */
  private getBookmarks(): void {
    this.subscriptions.push(this.bookmarkService.getBookmarks.subscribe((bookmarks: Bookmark[]) => {
      localStorage[this.bookmarkService.bookmarkCacheKey] = JSON.stringify(bookmarks);
      this.pagination.setData(bookmarks);
    }));
  }

  /**
   * Returns the paginated data, & also will ensure that if all the elements are deleted on the
   * last page of the paginated results that it will invoke the previousPage function, ensuring
   * the user isn't sat on an empty page.
   */
  private getPaginatedData(): void {
    this.subscriptions.push(this.pagination.getCurrentData.subscribe((paginatedResults) => {
      this.paginatedBookmarks = paginatedResults;
      if (!paginatedResults) {
        this.pagination.previousPage();
      }
    }));
  }

  /**
   * Returns the page numbers to be displayed in the pagination navigation controls.
   */
  private getPages() {
    this.subscriptions.push(this.pagination.getPageNumbers.subscribe((pageNumbers) => {
      this.pageNumbers = pageNumbers;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

}
