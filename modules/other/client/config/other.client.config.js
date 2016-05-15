'use strict';

// Configuring the Chat module
angular.module('banner').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: '杂项',
      state: 'other'
    });
  }
]);
