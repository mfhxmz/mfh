'use strict';

// Configuring the Chat module
angular.module('activity').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: '活动',
      state: 'activity',
      position: 1
    });
  }
]);
