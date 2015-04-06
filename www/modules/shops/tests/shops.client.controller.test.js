'use strict';

(function() {
	// Shops Controller Spec
	describe('Shops Controller Tests', function() {
		// Initialize global variables
		var ShopsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Shops controller.
			ShopsController = $controller('ShopsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Shop object fetched from XHR', inject(function(Shops) {
			// Create sample Shop using the Shops service
			var sampleShop = new Shops({
				name: 'New Shop'
			});

			// Create a sample Shops array that includes the new Shop
			var sampleShops = [sampleShop];

			// Set GET response
			$httpBackend.expectGET('shops').respond(sampleShops);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shops).toEqualData(sampleShops);
		}));

		it('$scope.findOne() should create an array with one Shop object fetched from XHR using a shopId URL parameter', inject(function(Shops) {
			// Define a sample Shop object
			var sampleShop = new Shops({
				name: 'New Shop'
			});

			// Set the URL parameter
			$stateParams.shopId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/shops\/([0-9a-fA-F]{24})$/).respond(sampleShop);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shop).toEqualData(sampleShop);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Shops) {
			// Create a sample Shop object
			var sampleShopPostData = new Shops({
				name: 'New Shop'
			});

			// Create a sample Shop response
			var sampleShopResponse = new Shops({
				_id: '525cf20451979dea2c000001',
				name: 'New Shop'
			});

			// Fixture mock form input values
			scope.name = 'New Shop';

			// Set POST response
			$httpBackend.expectPOST('shops', sampleShopPostData).respond(sampleShopResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Shop was created
			expect($location.path()).toBe('/shops/' + sampleShopResponse._id);
		}));

		it('$scope.update() should update a valid Shop', inject(function(Shops) {
			// Define a sample Shop put data
			var sampleShopPutData = new Shops({
				_id: '525cf20451979dea2c000001',
				name: 'New Shop'
			});

			// Mock Shop in scope
			scope.shop = sampleShopPutData;

			// Set PUT response
			$httpBackend.expectPUT(/shops\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/shops/' + sampleShopPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid shopId and remove the Shop from the scope', inject(function(Shops) {
			// Create new Shop object
			var sampleShop = new Shops({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Shops array and include the Shop
			scope.shops = [sampleShop];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/shops\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleShop);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.shops.length).toBe(0);
		}));
	});
}());