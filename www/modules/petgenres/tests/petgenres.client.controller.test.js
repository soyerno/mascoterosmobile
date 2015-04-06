'use strict';

(function() {
	// Petgenres Controller Spec
	describe('Petgenres Controller Tests', function() {
		// Initialize global variables
		var PetgenresController,
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

			// Initialize the Petgenres controller.
			PetgenresController = $controller('PetgenresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Petgenre object fetched from XHR', inject(function(Petgenres) {
			// Create sample Petgenre using the Petgenres service
			var samplePetgenre = new Petgenres({
				name: 'New Petgenre'
			});

			// Create a sample Petgenres array that includes the new Petgenre
			var samplePetgenres = [samplePetgenre];

			// Set GET response
			$httpBackend.expectGET('petgenres').respond(samplePetgenres);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petgenres).toEqualData(samplePetgenres);
		}));

		it('$scope.findOne() should create an array with one Petgenre object fetched from XHR using a petgenreId URL parameter', inject(function(Petgenres) {
			// Define a sample Petgenre object
			var samplePetgenre = new Petgenres({
				name: 'New Petgenre'
			});

			// Set the URL parameter
			$stateParams.petgenreId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/petgenres\/([0-9a-fA-F]{24})$/).respond(samplePetgenre);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petgenre).toEqualData(samplePetgenre);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Petgenres) {
			// Create a sample Petgenre object
			var samplePetgenrePostData = new Petgenres({
				name: 'New Petgenre'
			});

			// Create a sample Petgenre response
			var samplePetgenreResponse = new Petgenres({
				_id: '525cf20451979dea2c000001',
				name: 'New Petgenre'
			});

			// Fixture mock form input values
			scope.name = 'New Petgenre';

			// Set POST response
			$httpBackend.expectPOST('petgenres', samplePetgenrePostData).respond(samplePetgenreResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Petgenre was created
			expect($location.path()).toBe('/petgenres/' + samplePetgenreResponse._id);
		}));

		it('$scope.update() should update a valid Petgenre', inject(function(Petgenres) {
			// Define a sample Petgenre put data
			var samplePetgenrePutData = new Petgenres({
				_id: '525cf20451979dea2c000001',
				name: 'New Petgenre'
			});

			// Mock Petgenre in scope
			scope.petgenre = samplePetgenrePutData;

			// Set PUT response
			$httpBackend.expectPUT(/petgenres\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/petgenres/' + samplePetgenrePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petgenreId and remove the Petgenre from the scope', inject(function(Petgenres) {
			// Create new Petgenre object
			var samplePetgenre = new Petgenres({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Petgenres array and include the Petgenre
			scope.petgenres = [samplePetgenre];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/petgenres\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePetgenre);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.petgenres.length).toBe(0);
		}));
	});
}());