import { BookmarksHostComponent } from './_bookmarks-host-component/_bookmarks-host-component';
import { BookmarkSuccessComponent } from './bookmark-success/bookmark-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: BookmarksHostComponent
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
