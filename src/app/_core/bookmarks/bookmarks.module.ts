import { PaginationModule } from './../pagination/pagination.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { AddNewBookmarkComponent } from './add-new-bookmark/add-new-bookmark.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookmarkSuccessComponent } from './bookmark-success/bookmark-success.component';
import { AddOrEditBookmarkComponent } from './add-or-edit-bookmark/add-or-edit-bookmark.component';
import { BookmarksHostComponent } from './_bookmarks-host-component/_bookmarks-host-component';

@NgModule({
  declarations: [
    AddNewBookmarkComponent,
    BookmarksListComponent,
    BookmarkComponent,
    BookmarkSuccessComponent,
    AddOrEditBookmarkComponent,
    BookmarksHostComponent
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
