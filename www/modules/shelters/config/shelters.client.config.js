'use strict';

// Configuring the Articles module
angular.module('shelters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Refugios', 'shelters', 'dropdown', '/shelters(/create)?', false, null, null, 'icon-pointer');*/
		Menus.addMenuItem('sidebar', 'Refugios', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'icon-pointer');
		/*Menus.addSubMenuItem('sidebar', 'shelters', 'List Shelters', 'shelters');
		Menus.addSubMenuItem('sidebar', 'shelters', 'New Shelter', 'shelters/create');*/
	}
]);
