import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksHostComponent } from './_bookmarks-host-component';

describe('BookmarksListHostComponent', () => {
  let component: BookmarksHostComponent;
  let fixture: ComponentFixture<BookmarksHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
