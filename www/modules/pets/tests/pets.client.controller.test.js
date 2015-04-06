'use strict';

(function() {
	// Pets Controller Spec
	describe('Pets Controller Tests', function() {
		// Initialize global variables
		var PetsController,
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

			// Initialize the Pets controller.
			PetsController = $controller('PetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pet object fetched from XHR', inject(function(Pets) {
			// Create sample Pet using the Pets service
			var samplePet = new Pets({
				name: 'New Pet'
			});

			// Create a sample Pets array that includes the new Pet
			var samplePets = [samplePet];

			// Set GET response
			$httpBackend.expectGET('pets').respond(samplePets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pets).toEqualData(samplePets);
		}));

		it('$scope.findOne() should create an array with one Pet object fetched from XHR using a petId URL parameter', inject(function(Pets) {
			// Define a sample Pet object
			var samplePet = new Pets({
				name: 'New Pet'
			});

			// Set the URL parameter
			$stateParams.petId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pets\/([0-9a-fA-F]{24})$/).respond(samplePet);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pet).toEqualData(samplePet);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pets) {
			// Create a sample Pet object
			var samplePetPostData = new Pets({
				name: 'New Pet'
			});

			// Create a sample Pet response
			var samplePetResponse = new Pets({
				_id: '525cf20451979dea2c000001',
				name: 'New Pet'
			});

			// Fixture mock form input values
			scope.name = 'New Pet';

			// Set POST response
			$httpBackend.expectPOST('pets', samplePetPostData).respond(samplePetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pet was created
			expect($location.path()).toBe('/pets/' + samplePetResponse._id);
		}));

		it('$scope.update() should update a valid Pet', inject(function(Pets) {
			// Define a sample Pet put data
			var samplePetPutData = new Pets({
				_id: '525cf20451979dea2c000001',
				name: 'New Pet'
			});

			// Mock Pet in scope
			scope.pet = samplePetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pets/' + samplePetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petId and remove the Pet from the scope', inject(function(Pets) {
			// Create new Pet object
			var samplePet = new Pets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pets array and include the Pet
			scope.pets = [samplePet];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePet);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pets.length).toBe(0);
		}));
	});
}());