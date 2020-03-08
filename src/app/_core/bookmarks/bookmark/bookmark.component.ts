import { Bookmark, BookmarkService } from './../_services/bookmark.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'phantom-bookmark, phantom-bookmark[borderless]',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnChanges {

  @Input() bookmark: Bookmark;
  @Input() successPage: boolean;
  showDelete = false;

  constructor(
    private readonly bookmarkService: BookmarkService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  /**
   * Shows the delete dialog.
   */
  public enableDelete(): void {
    this.showDelete = true;
  }

  /**
   * Hides the delete dialong.
   */
  public cancelDelete(): void {
    this.showDelete = false;
  }

  /**
   * Invokes the deleteBookmark on bookmarkService.
   */
  public deleteBookmark(id: string): void {
    this.bookmarkService.deleteBookmark(id);
  }

  /**
   * Hides the edit panel, and invokes editBookmark on bookmarkService.
   */
  public updateBookmark(bookmark: Bookmark): void {
    this.bookmark.edit = false;
    this.bookmarkService.editBookmark(this.bookmark.id, bookmark);
  }

  /**
   * Shows the edit panel, & hides the delete panel if open.
   */
  public enableEdit(bookmark: Bookmark): void {
    bookmark.edit = !bookmark.edit;
    this.showDelete = false;
  }
}
