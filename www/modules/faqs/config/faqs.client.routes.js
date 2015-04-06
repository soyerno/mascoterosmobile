'use strict';

//Setting up route
angular.module('faqs').config(['$stateProvider',
	function($stateProvider) {
		// Faqs state routing
		$stateProvider.
		state('app.listFaqs', {
			url: '/faqs',
			templateUrl: 'modules/faqs/views/list-faqs.client.view.html'
		}).
		state('app.createFaq', {
			url: '/faqs/create',
			templateUrl: 'modules/faqs/views/create-faq.client.view.html'
		}).
		state('app.viewFaq', {
			url: '/faqs/:faqId',
			templateUrl: 'modules/faqs/views/view-faq.client.view.html'
		}).
		state('app.editFaq', {
			url: '/faqs/:faqId/edit',
			templateUrl: 'modules/faqs/views/edit-faq.client.view.html'
		});
	}
]);
