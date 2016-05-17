'use strict';

// Configuring the Chat module
angular.module('brand').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: '品牌',
      state: 'brand',
      position: 1
    });
  }
]);
