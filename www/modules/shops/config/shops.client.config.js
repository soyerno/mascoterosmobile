'use strict';

// Configuring the Articles module
angular.module('shops').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Tienda', 'tienda', 'dropdown', '/tienda(/create)?', false, null, null, 'fa fa-shopping-cart');*/
		/*Menus.addSubMenuItem('sidebar', 'shops', 'List Shops', 'shops');
		Menus.addSubMenuItem('sidebar', 'shops', 'New Shop', 'shops/create');*/
	}
]);
