import { Subscription } from 'rxjs/internal/Subscription';
import { Pagination } from './../classes/pagination';
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'phantom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {

  @Input() paginationObject: Pagination;
  @Input() pageNumbers: number[];
  currentPage = 1;
  totalPages: number;
  subscriptions: Subscription[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    /**
     * It's useful for developement purposes to notify the user if they have missed one of the Input properties,
     * both of them are fundamental to the logic and UI states of the component
     */
    if (this.paginationObject === null) {
      throw new TypeError('Please provide a pagination object input');
    }
    if (this.pageNumbers === null) {
      throw new TypeError('Please provide a pageNumbers input');
    }
    this.getTotalPageCount();
  }

  getTotalPageCount(): void {
    this.subscriptions.push(this.paginationObject.getTotalPages.subscribe((totalPages: number)=>{
      this.totalPages = totalPages;
    }));
  }

  /**
   * Sets the paginatedData to the corresponsing page number.
   */
  public setPage(pageNumber: number): void {
    this.paginationObject.setPage(pageNumber);
    this.currentPage = pageNumber;
  }

  /**
   * Sets the number of items to be shown per page.
   */
  public setPageLength(pageLength: number): void {
    this.paginationObject.setPageLength(pageLength);
  }

  /**
   * Increments the paginatedDate page by one.
   */
  public incrementPage(): void {
    this.paginationObject.nextPage();
    if (this.currentPage !== this.totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Decrements the paginatedDate page by one.
   */
  public decrementPage(): void {
    this.paginationObject.previousPage();
    if (this.currentPage !== 1) {
      this.currentPage--;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
