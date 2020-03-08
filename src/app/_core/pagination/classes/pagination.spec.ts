import { Pagination } from './pagination';

describe('Pagination', () => {
  let pagination: Pagination;
  const testData = [
    {
      url: 'Test1',
      note: 'Test1',
      edit: false,
      id: '1'
    },
    {
      url: 'Test2',
      note: 'Test2',
      edit: false,
      id: '2'
    },
    {
      url: 'Test3',
      note: 'Test3',
      edit: false,
      id: '3'
    },
    {
      url: 'Test4',
      note: 'Test4',
      edit: false,
      id: '4'
    },
    {
      url: 'Test5',
      note: 'Test5',
      edit: false,
      id: '5'
    },
  ];

  it('should create an instance', () => {
    expect(new Pagination()).toBeTruthy();
  });

  beforeEach(() => {
    pagination = new Pagination(1);
    pagination.setData(testData);
  });

  describe('setData', () => {
    it('Should slice and the set the data object, & then invoke paginate', () => {
      pagination.setData(testData);
      // @ts-ignore Normally I woudln't test a private variable but I want to ensure the data isn't linked by reference.
      expect(pagination.data === testData).toBeFalse();
    });
  });

  describe('nextPage', () => {
    it('Should increment the currentPage if currentPage !== pageCount & set the currentData to maximum index', () => {
      pagination.nextPage();
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[1]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
    it(`Shouldn't increment past pageCount`, () => {
      pagination.nextPage();
      pagination.nextPage();
      pagination.nextPage();
      pagination.nextPage();
      pagination.nextPage();
      pagination.nextPage();
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[4]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
  });

  describe('previousPage', () => {
    it('Should decrement the currentPage if currentPage !== 1', () => {
      pagination.nextPage();
      pagination.previousPage();
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[0]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
    it(`Shouldn't decrement if the currentPage is 1`, () => {
      pagination.previousPage();
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[0]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
  });

  describe('setPage', () => {
    it('Should set the currentData to the corresponding page number', () => {
      pagination.setPage(2);
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[1]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
    it('Should set the currentData to the corresponding page number', () => {
      pagination.setPage(3);
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[2]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
    it('Should set the currentData to the corresponding page number', () => {
      pagination.setPage(4);
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual([testData[3]]);
      });
      pagination.getCurrentData.unsubscribe();
    });
  });

  describe('setPageLength', () => {
    it('Should set the page length', () => {
      pagination.setPageLength(5);
      pagination.getCurrentData.subscribe((currentData) => {
        expect(currentData).toEqual(testData);
      });
      pagination.getCurrentData.unsubscribe();
    });
  });

});

