'use strict';

// Configuring the Articles module
angular.module('events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Eventos', 'events', 'dropdown', '/events(/create)?', false, null, null, 'fa fa-calendar');
		/*Menus.addSubMenuItem('sidebar', 'events', 'List Events', 'events');*/
		/*Menus.addSubMenuItem('sidebar', 'events', 'Nuevo Evento', 'events/create', false);*/
	}
]);
