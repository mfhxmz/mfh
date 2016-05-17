'use strict';

// Configuring the Chat module
angular.module('aim').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: '宗旨',
      state: 'aim',
      position: 3
    });
  }
]);
