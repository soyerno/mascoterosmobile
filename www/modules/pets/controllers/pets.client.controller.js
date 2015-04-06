'use strict';

// Pets controller
angular.module('pets').controller('PetsController', ['$scope', '$resource', '$stateParams', '$location', 'Authentication', 'Pets', 'Upload', 'geolocation', 'Notifications', '$http',
	function($scope, $resource, $stateParams, $location, Authentication, Pets, Upload, geolocation, Notifications, $http) {
		$scope.authentication = Authentication;

		$scope.step = 1;

		$scope.$watch('step', function(step){
			if(step === 3 && $scope.inviteUserEmail !== ''){
				$scope.email = $scope.inviteUserEmail;
			}
		});

		// Create new Pet
		$scope.create = function() {
			// Create new Pet object

			var pet = new Pets ({
				name: this.name,
				picture: this.picture,
				slug: this.slug,
				color: this.color,
				breed: this.breed,
				isMissing: this.isMissing,
				genre: this.genre,
        		yearOfBirth: this.yearOfBirth,
				description: this.description,
				neutered: this.neutered,
				email: this.email,
				address: this.address,
				isPrivate: this.isPrivate,
				isAdoption: this.isAdoption,
				tel1: this.tel1,
				tel2: this.tel2
			});

			$scope.formBusy = true;


			// Redirect after save
			Upload.parse(pet).then(function () {
				pet.$save(function(response) {
					$location.path('pet/' + response.slug);
					// Clear form fields
					$scope.name = '';
					$scope.picture = '';
					$scope.slug = '';
					$scope.color = '';
					$scope.breed = '';
					$scope.isMissing = '';
					$scope.neutered = '';
					$scope.email = '';
					$scope.address = '';
					$scope.isPrivate = '';
					$scope.isAdoption = '';
					$scope.tel1 = '';
					$scope.tel2 = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
				  	$scope.error = errorResponse.data.message;
				});
			});


		};

		// Remove existing Pet
		$scope.remove = function(pet) {
			if ( pet ) { 
				pet.$remove();

				for (var i in $scope.pets) {
					if ($scope.pets [i] === pet) {
						$scope.pets.splice(i, 1);
					}
				}
			} else {
				$scope.pet.$remove(function() {
					$location.path('pets');
				});
			}
		};

		// Update existing Pet
		$scope.update = function() {
			$scope.formBusy = true;
			var pet = $scope.pet;
			delete pet.$promise;
			delete pet.$resolved;

			Upload.parse(pet).then(function () {
				pet.$update(function() {
					$location.path('pet/' + pet.slug);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});

		};

		// Find a list of Pets
		$scope.find = function() {
			$scope.pets = Pets.query();
		};

		$scope.findAdoptions = function() {
			$http.get('/pets/adoption').
				success(function(data, status, headers, config) {
					$scope.pets = data;
				}).
				error(function(data, status, headers, config) {
					console.log('error loading adoption pets');
				});
		};

		// Find existing Pet
		$scope.findOne = function() {
			$scope.pet = Pets.get({ 
				petId: $stateParams.petId
			});
		};

    	$scope.findOneBySlug = function() {
			var Pet = $resource('/pet/:petSlug', {petSlug:'@slug'});
			$scope.pet = Pet.get({petSlug: $stateParams.petSlug}, function() {
				pet.get();
			});
		};


		var events = {
			places_changed: function (searchBox) {}
		}
		$scope.searchbox = { template:'searchbox.tpl.html', events:events};


		$scope.setGeoLocation = function() {
			$scope.center = $scope.coords;
			$scope.coordsUpdates = 0;
			$scope.dynamicMoveCtr = 0;
			$scope.map = {center: $scope.center, zoom: 18 };
		}

		$scope.getGeoLocalization = function() {
			geolocation.getLocation().then(function(data){
				$scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
				$scope.setGeoLocation();
			});
		};

		$scope.sendScanNotif = function() {
			/* @todo: add this to pet profile options*/
			var petSendNotification = true;
			if(petSendNotification){
				// Create new Notification object
				var notification = new Notifications ({
					title: $scope.pet.name + ' fue scaneado',
					pet: $scope.pet._id,
					geoLocation: $scope.coords
				});

				// Redirect after save
				notification.$save(function(response) {
					console.log(response);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};

		$scope.setPetMissing = function(value){
			var pet = $scope.pet;
			delete pet.$promise;
			delete pet.$resolved;

			pet.isMissing = value;

			debugger;
			pet.$update(function() {
				$location.path('pets/' + pet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

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
