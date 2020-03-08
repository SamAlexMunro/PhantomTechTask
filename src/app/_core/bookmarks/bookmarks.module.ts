import { PaginationModule } from './../pagination/pagination.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksListHostComponent } from './bookmarks-list-host/bookmarks-list-host.component';
import { AddNewBookmarkComponent } from './add-new-bookmark/add-new-bookmark.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookmarkSuccessComponent } from './bookmark-success/bookmark-success.component';
import { AddOrEditBookmarkComponent } from './add-or-edit-bookmark/add-or-edit-bookmark.component';

@NgModule({
  declarations: [
    BookmarksListHostComponent,
    AddNewBookmarkComponent,
    BookmarksListComponent,
    BookmarkComponent,
    BookmarkSuccessComponent,
    AddOrEditBookmarkComponent
  ],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    PaginationModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookmarksModule { }
