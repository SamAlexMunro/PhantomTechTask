import { BookmarkSuccessComponent } from './../bookmark-success/bookmark-success.component';
import { BookmarkService } from './../_services/bookmark.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookmarkComponent } from './add-new-bookmark.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('AddNewBookmarkComponent', () => {
  let component: AddNewBookmarkComponent;
  let fixture: ComponentFixture<AddNewBookmarkComponent>;
  const bookmarksObs$ = new BehaviorSubject<any>(null);
  const mockBookmarkService = {
    addBookmark: () => {
    },
    getBookmarks: bookmarksObs$.asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewBookmarkComponent],
      providers: [
        {
          provide: BookmarkService, useValue: mockBookmarkService
        },
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'success', component: BookmarkSuccessComponent }]
        )
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addBookmark', () => {
    it('Should add a new bookmark with the url and note field(Optional)', () => {
      const expectedData = { url: 'test', note: 'testNote', edit: false, id: '2' };
      spyOn(mockBookmarkService, 'addBookmark');
      component.addBookmark(expectedData);
      expect(mockBookmarkService.addBookmark).toHaveBeenCalledTimes(1);
    });
  });
});
