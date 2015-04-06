/*
'use strict';

// Configuring the Articles module
angular.module('issues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('offsidebar', 'Issues', 'issues', 'dropdown', '/issues(/create)?');
		Menus.addSubMenuItem('offsidebar', 'issues', 'List Issues', 'issues');
		Menus.addSubMenuItem('offsidebar', 'issues', 'New Issue', 'issues/create');
	}
]);*/
