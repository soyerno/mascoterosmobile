'use strict';

// Faqs controller
angular.module('faqs').controller('FaqsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Faqs',
	function($scope, $stateParams, $location, Authentication, Faqs) {
		$scope.authentication = Authentication;

		// Create new Faq
		$scope.create = function() {
			// Create new Faq object
			var faq = new Faqs ({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			faq.$save(function(response) {
				$location.path('faqs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Faq
		$scope.remove = function(faq) {
			if ( faq ) { 
				faq.$remove();

				for (var i in $scope.faqs) {
					if ($scope.faqs [i] === faq) {
						$scope.faqs.splice(i, 1);
					}
				}
			} else {
				$scope.faq.$remove(function() {
					$location.path('faqs');
				});
			}
		};

		// Update existing Faq
		$scope.update = function() {
			var faq = $scope.faq;

			faq.$update(function() {
				$location.path('faqs/' + faq._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Faqs
		$scope.find = function() {
			$scope.faqs = Faqs.query();
		};

		// Find existing Faq
		$scope.findOne = function() {
			$scope.faq = Faqs.get({ 
				faqId: $stateParams.faqId
			});
		};
	}
]);
