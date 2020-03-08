import { Bookmark } from './../_services/bookmark.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { urlValidator } from '../../../_shared/validators/urlValidator.class';

@Component({
  selector: 'phantom-add-or-edit-bookmark',
  templateUrl: './add-or-edit-bookmark.component.html',
  styleUrls: ['./add-or-edit-bookmark.component.scss']
})
export class AddOrEditBookmarkComponent implements OnInit, OnChanges {
  @Output() emitBookmark = new EventEmitter();
  @Output() cancelEditEmit = new EventEmitter();
  @Input() bookmarkToEdit: Bookmark;
  bookmarkFormModel = new FormGroup({
    url: new FormControl('', [urlValidator]),
    note: new FormControl(''),
  });

  constructor(
  ) { }

  ngOnInit(): void {
  }

  /**
   * Updates the bookmarkFormModel to bookmarkToEdit properties on @Input change.
   */
  ngOnChanges() {
    if (this.bookmarkToEdit) {
      this.bookmarkFormModel = new FormGroup({
        url: new FormControl(this.bookmarkToEdit?.url, [urlValidator]),
        note: new FormControl(this.bookmarkToEdit?.note),
      });
    }
  }

  /**
   *  Emits an event that will cancel the edit on the bookmark component.
   */
  cancelEdit() {
    this.cancelEditEmit.emit();
  }

  /**
   *  Emits the bookmark to bookmark component or the addNewBookmark component.
   */
  submitBookmark() {
    this.emitBookmark.emit(this.bookmarkFormModel.value);
  }

  /**
   * Grabs the URL formcontrol rather than drilling down in the form every time.
   */
  get url() { return this.bookmarkFormModel.get('url'); }

}
