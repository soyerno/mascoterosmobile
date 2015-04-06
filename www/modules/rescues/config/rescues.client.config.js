'use strict';

// Configuring the Articles module
angular.module('rescues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Voluntarios', 'rescues', 'dropdown', '/rescues(/create)?', false, null, null, 'fa fa-group');*/
		Menus.addMenuItem('sidebar', 'Voluntarios', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-group');
		/*Menus.addSubMenuItem('sidebar', 'rescues', 'List Rescues', 'rescues');
		Menus.addSubMenuItem('sidebar', 'rescues', 'New Rescue', 'rescues/create');*/
	}
]);
