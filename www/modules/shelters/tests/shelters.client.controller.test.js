'use strict';

(function() {
	// Shelters Controller Spec
	describe('Shelters Controller Tests', function() {
		// Initialize global variables
		var SheltersController,
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

			// Initialize the Shelters controller.
			SheltersController = $controller('SheltersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Shelter object fetched from XHR', inject(function(Shelters) {
			// Create sample Shelter using the Shelters service
			var sampleShelter = new Shelters({
				name: 'New Shelter'
			});

			// Create a sample Shelters array that includes the new Shelter
			var sampleShelters = [sampleShelter];

			// Set GET response
			$httpBackend.expectGET('shelters').respond(sampleShelters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shelters).toEqualData(sampleShelters);
		}));

		it('$scope.findOne() should create an array with one Shelter object fetched from XHR using a shelterId URL parameter', inject(function(Shelters) {
			// Define a sample Shelter object
			var sampleShelter = new Shelters({
				name: 'New Shelter'
			});

			// Set the URL parameter
			$stateParams.shelterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/shelters\/([0-9a-fA-F]{24})$/).respond(sampleShelter);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shelter).toEqualData(sampleShelter);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Shelters) {
			// Create a sample Shelter object
			var sampleShelterPostData = new Shelters({
				name: 'New Shelter'
			});

			// Create a sample Shelter response
			var sampleShelterResponse = new Shelters({
				_id: '525cf20451979dea2c000001',
				name: 'New Shelter'
			});

			// Fixture mock form input values
			scope.name = 'New Shelter';

			// Set POST response
			$httpBackend.expectPOST('shelters', sampleShelterPostData).respond(sampleShelterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Shelter was created
			expect($location.path()).toBe('/shelters/' + sampleShelterResponse._id);
		}));

		it('$scope.update() should update a valid Shelter', inject(function(Shelters) {
			// Define a sample Shelter put data
			var sampleShelterPutData = new Shelters({
				_id: '525cf20451979dea2c000001',
				name: 'New Shelter'
			});

			// Mock Shelter in scope
			scope.shelter = sampleShelterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/shelters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/shelters/' + sampleShelterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid shelterId and remove the Shelter from the scope', inject(function(Shelters) {
			// Create new Shelter object
			var sampleShelter = new Shelters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Shelters array and include the Shelter
			scope.shelters = [sampleShelter];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/shelters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleShelter);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.shelters.length).toBe(0);
		}));
	});
}());