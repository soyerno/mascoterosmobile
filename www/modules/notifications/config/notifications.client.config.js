/*
'use strict';

// Configuring the Articles module
angular.module('notifications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Notifications', 'notifications', 'dropdown', '/notifications(/create)?');
		Menus.addSubMenuItem('sidebar', 'notifications', 'List Notifications', 'notifications');
		Menus.addSubMenuItem('sidebar', 'notifications', 'New Notification', 'notifications/create');
	}
]);*/
