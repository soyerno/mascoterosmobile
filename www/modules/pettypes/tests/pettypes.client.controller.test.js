'use strict';

(function() {
	// Pettypes Controller Spec
	describe('Pettypes Controller Tests', function() {
		// Initialize global variables
		var PettypesController,
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

			// Initialize the Pettypes controller.
			PettypesController = $controller('PettypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pettype object fetched from XHR', inject(function(Pettypes) {
			// Create sample Pettype using the Pettypes service
			var samplePettype = new Pettypes({
				name: 'New Pettype'
			});

			// Create a sample Pettypes array that includes the new Pettype
			var samplePettypes = [samplePettype];

			// Set GET response
			$httpBackend.expectGET('pettypes').respond(samplePettypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pettypes).toEqualData(samplePettypes);
		}));

		it('$scope.findOne() should create an array with one Pettype object fetched from XHR using a pettypeId URL parameter', inject(function(Pettypes) {
			// Define a sample Pettype object
			var samplePettype = new Pettypes({
				name: 'New Pettype'
			});

			// Set the URL parameter
			$stateParams.pettypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pettypes\/([0-9a-fA-F]{24})$/).respond(samplePettype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pettype).toEqualData(samplePettype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pettypes) {
			// Create a sample Pettype object
			var samplePettypePostData = new Pettypes({
				name: 'New Pettype'
			});

			// Create a sample Pettype response
			var samplePettypeResponse = new Pettypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Pettype'
			});

			// Fixture mock form input values
			scope.name = 'New Pettype';

			// Set POST response
			$httpBackend.expectPOST('pettypes', samplePettypePostData).respond(samplePettypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pettype was created
			expect($location.path()).toBe('/pettypes/' + samplePettypeResponse._id);
		}));

		it('$scope.update() should update a valid Pettype', inject(function(Pettypes) {
			// Define a sample Pettype put data
			var samplePettypePutData = new Pettypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Pettype'
			});

			// Mock Pettype in scope
			scope.pettype = samplePettypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/pettypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pettypes/' + samplePettypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pettypeId and remove the Pettype from the scope', inject(function(Pettypes) {
			// Create new Pettype object
			var samplePettype = new Pettypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pettypes array and include the Pettype
			scope.pettypes = [samplePettype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pettypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePettype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pettypes.length).toBe(0);
		}));
	});
}());