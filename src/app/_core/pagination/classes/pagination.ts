import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export class Pagination {
  private pageLength: number;
  private roundedPageLength: number;
  private data: any[];
  private pages = {};
  private currentPage = 1;
  private pageCount: number;
  private pageArray$ = new BehaviorSubject(null);
  public currentData$ = new BehaviorSubject(null);

  constructor(pageLength = 20) {
    this.pageLength = pageLength;
  }

  /**
   * Sets the data to paginate.
   */
  public setData(data: any[]): void {
    this.data = data.slice();
    this.paginate();
  }

  /**
   * Incrementally changes the page.
   */
  public nextPage(): void {
    if (this.currentPage !== this.pageCount) {
      this.currentPage++;
      this.setCurrentData(this.pages[this.currentPage]);
      this.buildPageNumbers();
    }
  }

  /**
   * Decrementally changes the page.
   */
  public previousPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.setCurrentData(this.pages[this.currentPage]);
      this.buildPageNumbers();
    }
  }

  /**
   * Sets the page from a fixed number
   */
  public setPage(pageNumber: number): void {
    this.setCurrentData(this.pages[pageNumber]);
    this.currentPage = pageNumber;
    this.buildPageNumbers();
  }

  /**
   * Returns the currentData subject.
   */
  public get getCurrentData(): BehaviorSubject<any[]> {
    return this.currentData$;
  }

  public get getPageNumbers(): BehaviorSubject<number[]> {
    return this.pageArray$;
  }

  /**
   * Change the default page length value & rebuild the pagination.
   */
  public setPageLength(pageLength: number): void {
    this.pageLength = pageLength;
    this.paginate();
  }

  /**
   * Rounds the page length to a whole number, in the edge case a whole number is not provided to the constructor
   * Based of page length, then setups the pages object with the correct number and index of pages.
   */
  private paginate(): void {
    this.roundedPageLength = Math.ceil(this.pageLength);
    this.pageCount = Math.ceil((this.data.length / this.roundedPageLength));
    this.pages = {};
    for (let i = 1; i <= this.pageCount; i++) {
      const page = i;
      this.pages[page] = [];
    }
    this.mapDataIntoPages(this.roundedPageLength);
  }

  /** Builds the page numbers to be shown and push that value into an observable stream to be consumed by
   * the file instantiating this class, it can then be piped down (@Input) into the pagination component or used for
   * a custom made pagination component
   */
  private buildPageNumbers(): void {
    const pageArray = [];
    let currentPage = this.currentPage;
    if (currentPage !== 1) {
      currentPage--;
      pageArray.push(currentPage);
    } else {
      pageArray.push(currentPage);
    }
    if (this.pageCount > 1) {
      for (let i = 0; i < this.pageCount; i++) {
        if (currentPage < this.pageCount && pageArray.length < 3) {
          currentPage += 1;
          pageArray.push(currentPage);
        }
      }
    }
    this.pageArray$.next(pageArray);
  }

  /**
   * Maps the sliced data into the correct pages within the pages object.
   */
  private mapDataIntoPages(pageLength: number): void {
    let page = 1;
    let itemsInCurrentPage = 0;
    this.data.map((item) => {
      if (itemsInCurrentPage !== pageLength) {
        this.pages[page].push(item);
        itemsInCurrentPage++;
      } else {
        itemsInCurrentPage = 1;
        page++;
        this.pages[page].push(item);
      }
    });
    this.setCurrentData(this.pages[this.currentPage]);
    this.buildPageNumbers();
  }

  /**
   * Sets the currently indexed page from the pages object into the currentData subject.
   */
  private setCurrentData(data: any): void {
    this.currentData$.next(data);
  }
}
