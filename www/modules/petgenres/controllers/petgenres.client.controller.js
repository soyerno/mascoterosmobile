'use strict';

// Petgenres controller
angular.module('petgenres').controller('PetgenresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Petgenres',
	function($scope, $stateParams, $location, Authentication, Petgenres) {
		$scope.authentication = Authentication;

		// Create new Petgenre
		$scope.create = function() {
			// Create new Petgenre object
			var petgenre = new Petgenres ({
				name: this.name
			});

			// Redirect after save
			petgenre.$save(function(response) {
				$location.path('petgenres/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Petgenre
		$scope.remove = function(petgenre) {
			if ( petgenre ) { 
				petgenre.$remove();

				for (var i in $scope.petgenres) {
					if ($scope.petgenres [i] === petgenre) {
						$scope.petgenres.splice(i, 1);
					}
				}
			} else {
				$scope.petgenre.$remove(function() {
					$location.path('petgenres');
				});
			}
		};

		// Update existing Petgenre
		$scope.update = function() {
			var petgenre = $scope.petgenre;

			petgenre.$update(function() {
				$location.path('petgenres/' + petgenre._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Petgenres
		$scope.find = function() {
			$scope.petgenres = Petgenres.query();
		};

		// Find existing Petgenre
		$scope.findOne = function() {
			$scope.petgenre = Petgenres.get({ 
				petgenreId: $stateParams.petgenreId
			});
		};
	}
]);