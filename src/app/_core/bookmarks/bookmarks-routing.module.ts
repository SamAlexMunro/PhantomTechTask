import { BookmarkSuccessComponent } from './bookmark-success/bookmark-success.component';
import { BookmarksListHostComponent } from './bookmarks-list-host/bookmarks-list-host.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: BookmarksListHostComponent
  },
  {
    path: 'success', component: BookmarkSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
