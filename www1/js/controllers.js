angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

		$scope.enterValidation = function () {
			return true;
		};

		$scope.exitValidation = function () {
			return true;
		};
		// Form data for the login modal
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function () {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function () {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function () {
			console.log('Doing login', $scope.loginData);

			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function () {
				$scope.closeLogin();
			}, 1000);
		};
})
.controller('LoginCtrl', function($scope, $location, $cordovaOauth) {

	$scope.facebookLogin = function() {
		$cordovaOauth.facebook("263148750546220", ["email"]).then(function (result) {
			// results
			$localstorage.setObject('facebookProflie', result);
			$scope.result  = $localstorage.getObject('facebookProflie');

			console.log(JSON.stringify(result));
			$location('/signup')
		}, function (error) {
			// errors
			console.log(error);
		});
	};

	$scope.twitterLogin = function() {
		debugger;
		$cordovaOauth.twitter("263148750546220", ["email"]).then(function(result) {
			// results
			$localstorage.setObject('facebookProflie', result);
			$scope.result  = $localstorage.getObject('facebookProflie');
		}, function(error) {
			// error
			console.log(error);
		});
	};

});

angular.module('ionic.utils', [])

	.factory('$localstorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		}
	}]);
