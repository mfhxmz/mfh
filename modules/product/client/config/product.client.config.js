'use strict';

// Configuring the Chat module
angular.module('product').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: '商品',
      state: 'product.new'
    });
  }
]);
