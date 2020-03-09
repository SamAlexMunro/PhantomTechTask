import { Subscription } from 'rxjs/internal/Subscription';
import { BookmarkService, Bookmark } from './../_services/bookmark.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'phantom-add-new-bookmark',
  templateUrl: './add-new-bookmark.component.html',
  styleUrls: ['./add-new-bookmark.component.scss']
})
export class AddNewBookmarkComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Creates & adds a new bookmark to the bookmarks$ & navigates the user to a success page
   * and sets any bookmarks with the edit property to false.
   */
  public addBookmark(formValue: Bookmark): void {
    this.bookmarkService.addBookmark({
      url: formValue.url,
      note: formValue.note,
      edit: false,
      id: uuidv4()
    });
    this.subscriptions.push(this.bookmarkService.getBookmarks.subscribe((bookmarks) => {
      bookmarks.forEach((book) => {
        book.edit = false;
      });
    }));
    this.router.navigate(['success']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
