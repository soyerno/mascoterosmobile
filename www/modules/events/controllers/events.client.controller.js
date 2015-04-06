'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Upload', 'Events',
	function($scope, $stateParams, $location, Authentication, Upload, Events) {
		$scope.authentication = Authentication;

		// Create new Event
		$scope.create = function() {
			// Create new Event object
			var event = new Events ({
				title: this.title,
				image: this.image,
				date: this.date,
				content: this.content
			});

			$scope.formBusy = true;

			// Redirect after save
			Upload.parse(event).then(function () {
				event.$save(function(response) {
					$location.path('events/' + response._id);

					// Clear form fields
					$scope.title = '';
					$scope.image = '';
					$scope.content = '';
					$scope.date = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
					$scope.error = errorResponse.data.message;
				});
			});
		};

		// Remove existing Event
		$scope.remove = function(event) {
			if ( event ) { 
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events [i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Events
		$scope.find = function() {
			$scope.events = Events.query();
		};

		// Find existing Event
		$scope.findOne = function() {
			$scope.event = Events.get({ 
				eventId: $stateParams.eventId
			});
		};

		/*Date directive */
		$scope.today = function() {
			$scope.yearOfBirth = new Date();
		};
		//$scope.today();

		$scope.clear = function () {
			$scope.yearOfBirth = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			//return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : '01/01/1970';
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yyyy',
			startingDay: 1
		};

		$scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];


	}
]);
