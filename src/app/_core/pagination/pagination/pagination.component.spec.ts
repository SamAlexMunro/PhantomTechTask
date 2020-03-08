import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { Pagination } from '../classes/pagination';

class PaginationMock extends Pagination { }

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.paginationObject = new PaginationMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setPage', () => {
    it('Should invoke the setPage on paginationObject with a page number', () => {
      const spy = spyOn(component.paginationObject, 'setPage');
      component.setPage(2);
      expect(spy).toHaveBeenCalledWith(2);
    });
  });

  describe('setPageLength', () => {
    it('Should invoke the setPageLength on paginationObject with a page length', () => {
      const spy = spyOn(component.paginationObject, 'setPageLength');
      component.setPageLength(5);
      expect(spy).toHaveBeenCalledWith(5);
    });
  });

  describe('incrementPage', () => {
    it('Should invoke the nextPage on paginationObject', () => {
      const spy = spyOn(component.paginationObject, 'nextPage');
      component.incrementPage();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('decrementPage', () => {
    it('Should invoke the previousPage on paginationObject', () => {
      const spy = spyOn(component.paginationObject, 'previousPage');
      component.decrementPage();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

