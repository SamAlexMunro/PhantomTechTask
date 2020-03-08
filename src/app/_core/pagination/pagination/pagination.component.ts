import { Subscription } from 'rxjs/internal/Subscription';
import { Pagination } from './../classes/pagination';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'phantom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationObject: Pagination;
  @Input() pageNumbers: number[];
  currentPage = 1;

  constructor(
  ) { }

  ngOnInit(): void {
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
    this.currentPage++;
  }

  /**
   * Decrements the paginatedDate page by one.
   */
  public decrementPage(): void {
    this.paginationObject.previousPage();
    this.currentPage--;
  }
}
