'use strict';

// Issues controller
angular.module('issues').controller('IssuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Issues', 'Upload',
	function($scope, $stateParams, $location, Authentication, Issues, Upload) {
		$scope.authentication = Authentication;

		// Create new Issue
		$scope.create = function() {
			// Create new Issue object
			var issue = new Issues ({
				title: this.title,
				image: this.image,
				description: this.description
			});

			$scope.formBusy = true;

			// Redirect after save
			Upload.parse(issue).then(function () {
				issue.$save(function(response) {
					$location.path('issues/' + response._id);

					// Clear form fields
					$scope.title = '';
					$scope.image = '';
					$scope.description = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
					$scope.error = errorResponse.data.message;
				});
			});

		};

		// Remove existing Issue
		$scope.remove = function(issue) {
			if ( issue ) { 
				issue.$remove();

				for (var i in $scope.issues) {
					if ($scope.issues [i] === issue) {
						$scope.issues.splice(i, 1);
					}
				}
			} else {
				$scope.issue.$remove(function() {
					$location.path('issues');
				});
			}
		};

		// Update existing Issue
		$scope.update = function() {
			var issue = $scope.issue;

			$scope.formBusy = true;
			issue.$update(function() {
				$location.path('issues/' + issue._id);
			}, function(errorResponse) {
				$scope.formBusy = false;
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Issues
		$scope.find = function() {
			$scope.issues = Issues.query();
		};

		// Find existing Issue
		$scope.findOne = function() {
			$scope.issue = Issues.get({ 
				issueId: $stateParams.issueId
			});
		};
	}
]);
