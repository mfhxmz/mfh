(function () {
  'use strict';

  angular.module('core').filter('startFrom', function () {
    return function (input, start) {
      return input.slice(start - 1);
    };
  });

  angular.module('core').controller('GridCtrl', function ($scope) {
    var grid = this;
    grid.data = [];
    grid.dataTable = new AngularDataTable(grid.data);

    $scope.$on('setGridData', function (event, data) {
      grid.data = data;
      grid.dataTable = new AngularDataTable(grid.data);
    });

    return grid;
  });

  var AngularDataTable = function (data) {

    return {
      data: data,
      filteredData: {},
      filter: '',
      currentPage: 0,
      pageSize: 10,
      sortColumn: 'LastUpdateTime' || '',
      sortDescending: true,

      numberOfPages: function () {
        return Math.ceil(this.filteredData.length / this.pageSize);
      },
      currentPageStart: function () {
        return (this.currentPage * this.pageSize) + 1;
      },
      currentPageEnd: function () {
        return Math.min((this.currentPage + 1) * this.pageSize, this.filteredData.length);
      },
      pages: function () {
        var p = [];
        for (var i = 1; i <= this.numberOfPages(); i++) {
          p.push(i);
        }
        return p;
      },
      goToPage: function (page) {
        this.currentPage = page - 1;
      },
      next: function () {
        if (!this.onLastPage()) this.currentPage += 1;
      },
      previous: function () {
        if (!this.onFirstPage()) this.currentPage -= 1;
      },
      onFirstPage: function () {
        return (this.currentPage === 0);
      },
      onLastPage: function () {
        return (this.currentPage === this.numberOfPages() - 1);
      },
      sort: function (column) {
        this.resetPaging();
        if (this.sortColumn === column) {
          this.sortDescending = !this.sortDescending;
        } else {
          this.sortColumn = column;
          this.sortDescending = false;
        }
      },
      resetPaging: function () {
        this.currentPage = 0;
      }
    };
  };
})();
