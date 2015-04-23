angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaBarcodeScanner, $ionicPlatform,
                                $cordovaInAppBrowser,$http, $cordovaOauth) {
  $scope.click =  function(){
		$ionicPlatform.ready(function() {
			$cordovaBarcodeScanner
				.scan()
				.then(function(barcodeData) {
					// Success! Barcode data is here
					if(!barcodeData.cancelled){
						//window.open(barcodeData.text, '_system');
            $cordovaInAppBrowser.open(barcodeData.text, '_blank', options)
              .then(function(event) {
                // success
              })
              .catch(function(event) {
                // error
              });
					}
				}, function(error) {
					// An error occurred
				});
		});
	};

  $scope.facebookLogin = function() {
    $cordovaOauth.facebook("1414293935539684", ["email"]).then(function(result) {
      //fwtv 10.30.10.110
      //la air 192.168.1.104
      $http.get('http://10.30.10.110:3000/api/auth/facebook/validateToken?access_token=' + result.access_token).then(function(response){
        $scope.result = response;
      });
    }, function(error) {
      $scope.result = error;
    });
  };

  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

  $scope.addPet = function () {
    $cordovaInAppBrowser.open('http://mascoteros.net/#!/pets/create', '_blank', options)
        .then(function(event) {
          // success
        })
        .catch(function(event) {
          // error
        });
  };

	$scope.enterValidation = function(){
    return true;
  };

  $scope.exitValidation = function(){
    return true;
  };
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('BarcodeCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope, $stateParams) {
});
