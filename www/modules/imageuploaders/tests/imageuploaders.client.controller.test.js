'use strict';

(function() {
	// Imageuploaders Controller Spec
	describe('Imageuploaders Controller Tests', function() {
		// Initialize global variables
		var ImageuploadersController,
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

			// Initialize the Imageuploaders controller.
			ImageuploadersController = $controller('ImageuploadersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Imageuploader object fetched from XHR', inject(function(Imageuploaders) {
			// Create sample Imageuploader using the Imageuploaders service
			var sampleImageuploader = new Imageuploaders({
				name: 'New Imageuploader'
			});

			// Create a sample Imageuploaders array that includes the new Imageuploader
			var sampleImageuploaders = [sampleImageuploader];

			// Set GET response
			$httpBackend.expectGET('imageuploaders').respond(sampleImageuploaders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.imageuploaders).toEqualData(sampleImageuploaders);
		}));

		it('$scope.findOne() should create an array with one Imageuploader object fetched from XHR using a imageuploaderId URL parameter', inject(function(Imageuploaders) {
			// Define a sample Imageuploader object
			var sampleImageuploader = new Imageuploaders({
				name: 'New Imageuploader'
			});

			// Set the URL parameter
			$stateParams.imageuploaderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/imageuploaders\/([0-9a-fA-F]{24})$/).respond(sampleImageuploader);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.imageuploader).toEqualData(sampleImageuploader);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Imageuploaders) {
			// Create a sample Imageuploader object
			var sampleImageuploaderPostData = new Imageuploaders({
				name: 'New Imageuploader'
			});

			// Create a sample Imageuploader response
			var sampleImageuploaderResponse = new Imageuploaders({
				_id: '525cf20451979dea2c000001',
				name: 'New Imageuploader'
			});

			// Fixture mock form input values
			scope.name = 'New Imageuploader';

			// Set POST response
			$httpBackend.expectPOST('imageuploaders', sampleImageuploaderPostData).respond(sampleImageuploaderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Imageuploader was created
			expect($location.path()).toBe('/imageuploaders/' + sampleImageuploaderResponse._id);
		}));

		it('$scope.update() should update a valid Imageuploader', inject(function(Imageuploaders) {
			// Define a sample Imageuploader put data
			var sampleImageuploaderPutData = new Imageuploaders({
				_id: '525cf20451979dea2c000001',
				name: 'New Imageuploader'
			});

			// Mock Imageuploader in scope
			scope.imageuploader = sampleImageuploaderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/imageuploaders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/imageuploaders/' + sampleImageuploaderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid imageuploaderId and remove the Imageuploader from the scope', inject(function(Imageuploaders) {
			// Create new Imageuploader object
			var sampleImageuploader = new Imageuploaders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Imageuploaders array and include the Imageuploader
			scope.imageuploaders = [sampleImageuploader];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/imageuploaders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleImageuploader);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.imageuploaders.length).toBe(0);
		}));
	});
}());