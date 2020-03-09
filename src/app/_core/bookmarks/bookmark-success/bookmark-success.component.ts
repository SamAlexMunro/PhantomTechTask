import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookmarkService, Bookmark } from './../_services/bookmark.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'phantom-bookmark-success',
  templateUrl: './bookmark-success.component.html'
})
export class BookmarkSuccessComponent implements OnInit {

  subscriptions: Subscription[] = [];
  bookmark: Bookmark;

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getBookmarks();
  }

  /** Sets the bookmark.edit to false to prevent  */
  navigateToLandingPage() {
    if (this.bookmark) {
      this.bookmark.edit = false;
    }
    this.router.navigate(['']);
  }

  /**
   * Gets the bookmarks for the template to iterate over.
   */
  private getBookmarks(): void {
    this.subscriptions.push(this.bookmarkService.getBookmarks.subscribe((bookmarks) => {
      this.bookmark = bookmarks[0];
    }));
  }
}
