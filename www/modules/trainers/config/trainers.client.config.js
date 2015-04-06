'use strict';

// Configuring the Articles module
angular.module('trainers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Entrenadores', 'trainers', 'dropdown', '/trainers(/create)?', false, null, null, 'fa fa-book');*/
		Menus.addMenuItem('sidebar', 'Entrenadores', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-book');
		/*Menus.addSubMenuItem('sidebar', 'trainers', 'List Trainers', 'trainers');*/
		/*Menus.addSubMenuItem('sidebar', 'trainers', 'New Trainer', 'trainers/create');*/
	}
]);
