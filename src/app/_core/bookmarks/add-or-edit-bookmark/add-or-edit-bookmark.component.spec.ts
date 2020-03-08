import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditBookmarkComponent } from './add-or-edit-bookmark.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AddOrEditBookmarkComponent', () => {
  let component: AddOrEditBookmarkComponent;
  let fixture: ComponentFixture<AddOrEditBookmarkComponent>;
  const bookmark = {
    url: 'test.url',
    note: 'test note',
    edit: false,
    id: '1'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditBookmarkComponent],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancelEdit', () => {
    it('Should emit an event when the cancel edit button is clicked', () => {
      component.bookmarkToEdit = bookmark;
      const cancelEdit = spyOn(component, 'cancelEdit');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.cancel'));
      button.nativeElement.click();
      component.cancelEditEmit.subscribe((event) => {
        expect(event).toBe(undefined);
      });
      expect(cancelEdit).toHaveBeenCalledTimes(1);
      component.cancelEditEmit.unsubscribe();
    });
  });

  describe('url', () => {
    it('Should return the URL form control', () => {
      expect(component.url).toEqual(component.bookmarkFormModel.controls.url);
    });
  });

  describe('onChanges', () => {
    it('Should update the form model when a valid bookmark Input comes through', () => {
      component.bookmarkToEdit = bookmark;
      component.ngOnChanges();
      expect(component.bookmarkFormModel.controls.note.value).toBe('test note');
      expect(component.url.value).toBe('test.url');
    });
    it('Should do nothing to the form model when there is no bookmarkToEdit property', () => {
      component.bookmarkToEdit = null;
      component.ngOnChanges();
      expect(component.bookmarkFormModel.controls.note.value).toBe('');
      expect(component.url.value).toBe('');
    });
  });
});


