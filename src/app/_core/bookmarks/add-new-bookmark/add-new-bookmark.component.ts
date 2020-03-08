import { BookmarkService, Bookmark } from './../_services/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'phantom-add-new-bookmark',
  templateUrl: './add-new-bookmark.component.html',
  styleUrls: ['./add-new-bookmark.component.scss']
})
export class AddNewBookmarkComponent implements OnInit {

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Creates & adds a new bookmark to the bookmarks$ & navigates the user to a success page  */
  public addBookmark(formValue: Bookmark): void {
    this.bookmarkService.addBookmark({
      url: formValue.url,
      note: formValue.note,
      edit: false,
      id: uuidv4()
    });
    this.router.navigate(['success']);
  }
}
