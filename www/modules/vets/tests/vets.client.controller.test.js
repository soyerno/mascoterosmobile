'use strict';

(function() {
	// Vets Controller Spec
	describe('Vets Controller Tests', function() {
		// Initialize global variables
		var VetsController,
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

			// Initialize the Vets controller.
			VetsController = $controller('VetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vet object fetched from XHR', inject(function(Vets) {
			// Create sample Vet using the Vets service
			var sampleVet = new Vets({
				name: 'New Vet'
			});

			// Create a sample Vets array that includes the new Vet
			var sampleVets = [sampleVet];

			// Set GET response
			$httpBackend.expectGET('vets').respond(sampleVets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vets).toEqualData(sampleVets);
		}));

		it('$scope.findOne() should create an array with one Vet object fetched from XHR using a vetId URL parameter', inject(function(Vets) {
			// Define a sample Vet object
			var sampleVet = new Vets({
				name: 'New Vet'
			});

			// Set the URL parameter
			$stateParams.vetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/vets\/([0-9a-fA-F]{24})$/).respond(sampleVet);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vet).toEqualData(sampleVet);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Vets) {
			// Create a sample Vet object
			var sampleVetPostData = new Vets({
				name: 'New Vet'
			});

			// Create a sample Vet response
			var sampleVetResponse = new Vets({
				_id: '525cf20451979dea2c000001',
				name: 'New Vet'
			});

			// Fixture mock form input values
			scope.name = 'New Vet';

			// Set POST response
			$httpBackend.expectPOST('vets', sampleVetPostData).respond(sampleVetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vet was created
			expect($location.path()).toBe('/vets/' + sampleVetResponse._id);
		}));

		it('$scope.update() should update a valid Vet', inject(function(Vets) {
			// Define a sample Vet put data
			var sampleVetPutData = new Vets({
				_id: '525cf20451979dea2c000001',
				name: 'New Vet'
			});

			// Mock Vet in scope
			scope.vet = sampleVetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/vets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/vets/' + sampleVetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid vetId and remove the Vet from the scope', inject(function(Vets) {
			// Create new Vet object
			var sampleVet = new Vets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Vets array and include the Vet
			scope.vets = [sampleVet];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/vets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVet);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.vets.length).toBe(0);
		}));
	});
}());