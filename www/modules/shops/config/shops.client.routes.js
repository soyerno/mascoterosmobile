'use strict';

//Setting up route
angular.module('shops').config(['$stateProvider',
	function($stateProvider) {
		// Shops state routing
		$stateProvider.
		state('app.listShops', {
			url: '/tienda',
			templateUrl: 'modules/shops/views/list-shops.client.view.html'
		}).
		state('app.createShop', {
			url: '/tienda/create',
			templateUrl: 'modules/shops/views/create-shop.client.view.html'
		}).
		state('app.viewShop', {
			url: '/tienda/:shopId',
			templateUrl: 'modules/shops/views/view-shop.client.view.html'
		}).
		state('app.editShop', {
			url: '/tienda/:shopId/edit',
			templateUrl: 'modules/shops/views/edit-shop.client.view.html'
		});
	}
]);
