'use strict';

// Configuring the Chat module
angular.module('banner').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Banner',
      state: 'banner.home',
      position: 3
    });
  }
]);
