'use strict';

(function() {
	// Rescues Controller Spec
	describe('Rescues Controller Tests', function() {
		// Initialize global variables
		var RescuesController,
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

			// Initialize the Rescues controller.
			RescuesController = $controller('RescuesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rescue object fetched from XHR', inject(function(Rescues) {
			// Create sample Rescue using the Rescues service
			var sampleRescue = new Rescues({
				name: 'New Rescue'
			});

			// Create a sample Rescues array that includes the new Rescue
			var sampleRescues = [sampleRescue];

			// Set GET response
			$httpBackend.expectGET('rescues').respond(sampleRescues);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rescues).toEqualData(sampleRescues);
		}));

		it('$scope.findOne() should create an array with one Rescue object fetched from XHR using a rescueId URL parameter', inject(function(Rescues) {
			// Define a sample Rescue object
			var sampleRescue = new Rescues({
				name: 'New Rescue'
			});

			// Set the URL parameter
			$stateParams.rescueId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rescues\/([0-9a-fA-F]{24})$/).respond(sampleRescue);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rescue).toEqualData(sampleRescue);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rescues) {
			// Create a sample Rescue object
			var sampleRescuePostData = new Rescues({
				name: 'New Rescue'
			});

			// Create a sample Rescue response
			var sampleRescueResponse = new Rescues({
				_id: '525cf20451979dea2c000001',
				name: 'New Rescue'
			});

			// Fixture mock form input values
			scope.name = 'New Rescue';

			// Set POST response
			$httpBackend.expectPOST('rescues', sampleRescuePostData).respond(sampleRescueResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rescue was created
			expect($location.path()).toBe('/rescues/' + sampleRescueResponse._id);
		}));

		it('$scope.update() should update a valid Rescue', inject(function(Rescues) {
			// Define a sample Rescue put data
			var sampleRescuePutData = new Rescues({
				_id: '525cf20451979dea2c000001',
				name: 'New Rescue'
			});

			// Mock Rescue in scope
			scope.rescue = sampleRescuePutData;

			// Set PUT response
			$httpBackend.expectPUT(/rescues\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rescues/' + sampleRescuePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rescueId and remove the Rescue from the scope', inject(function(Rescues) {
			// Create new Rescue object
			var sampleRescue = new Rescues({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rescues array and include the Rescue
			scope.rescues = [sampleRescue];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rescues\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRescue);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rescues.length).toBe(0);
		}));
	});
}());