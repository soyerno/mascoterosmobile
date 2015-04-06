'use strict';

// Configuring the Articles module
angular.module('vets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Veterinarias', 'vets', 'dropdown', '/vets(/create)?', false, null, null, 'fa fa-medkit');*/
		Menus.addMenuItem('sidebar', 'Veterinarias', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-medkit');
		/*Menus.addSubMenuItem('sidebar', 'vets', 'List Vets', 'vets');*/
		/*Menus.addSubMenuItem('sidebar', 'vets', 'New Vet', 'vets/create');*/
	}
]);
