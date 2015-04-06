'use strict';

// Pettypes controller
angular.module('pettypes').controller('PettypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pettypes',
	function($scope, $stateParams, $location, Authentication, Pettypes) {
		$scope.authentication = Authentication;

		// Create new Pettype
		$scope.create = function() {
			// Create new Pettype object
			var pettype = new Pettypes ({
				name: this.name
			});

			// Redirect after save
			pettype.$save(function(response) {
				$location.path('pettypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pettype
		$scope.remove = function(pettype) {
			if ( pettype ) { 
				pettype.$remove();

				for (var i in $scope.pettypes) {
					if ($scope.pettypes [i] === pettype) {
						$scope.pettypes.splice(i, 1);
					}
				}
			} else {
				$scope.pettype.$remove(function() {
					$location.path('pettypes');
				});
			}
		};

		// Update existing Pettype
		$scope.update = function() {
			var pettype = $scope.pettype;

			pettype.$update(function() {
				$location.path('pettypes/' + pettype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pettypes
		$scope.find = function() {
			$scope.pettypes = Pettypes.query();
		};

		// Find existing Pettype
		$scope.findOne = function() {
			$scope.pettype = Pettypes.get({ 
				pettypeId: $stateParams.pettypeId
			});
		};
	}
]);