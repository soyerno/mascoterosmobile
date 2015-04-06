'use strict';

// Trainers controller
angular.module('trainers').controller('TrainersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trainers',
	function($scope, $stateParams, $location, Authentication, Trainers) {
		$scope.authentication = Authentication;

		// Create new Trainer
		$scope.create = function() {
			// Create new Trainer object
			var trainer = new Trainers ({
				name: this.name
			});

			// Redirect after save
			trainer.$save(function(response) {
				$location.path('trainers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Trainer
		$scope.remove = function(trainer) {
			if ( trainer ) { 
				trainer.$remove();

				for (var i in $scope.trainers) {
					if ($scope.trainers [i] === trainer) {
						$scope.trainers.splice(i, 1);
					}
				}
			} else {
				$scope.trainer.$remove(function() {
					$location.path('trainers');
				});
			}
		};

		// Update existing Trainer
		$scope.update = function() {
			var trainer = $scope.trainer;

			trainer.$update(function() {
				$location.path('trainers/' + trainer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Trainers
		$scope.find = function() {
			$scope.trainers = Trainers.query();
		};

		// Find existing Trainer
		$scope.findOne = function() {
			$scope.trainer = Trainers.get({ 
				trainerId: $stateParams.trainerId
			});
		};
	}
]);