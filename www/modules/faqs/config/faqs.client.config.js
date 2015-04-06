'use strict';

// Configuring the Articles module
angular.module('faqs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Preguntas frecuentes', 'faqs', 'dropdown', '/faqs(/create)?', true, null, null, 'icon-info');
		/*Menus.addSubMenuItem('sidebar', 'faqs', 'List Faqs', 'faqs');*/
		/*Menus.addSubMenuItem('sidebar', 'faqs', 'New Faq', 'faqs/create');*/
	}
]);
