'use strict';

(function() {
	// Faqs Controller Spec
	describe('Faqs Controller Tests', function() {
		// Initialize global variables
		var FaqsController,
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

			// Initialize the Faqs controller.
			FaqsController = $controller('FaqsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Faq object fetched from XHR', inject(function(Faqs) {
			// Create sample Faq using the Faqs service
			var sampleFaq = new Faqs({
				name: 'New Faq'
			});

			// Create a sample Faqs array that includes the new Faq
			var sampleFaqs = [sampleFaq];

			// Set GET response
			$httpBackend.expectGET('faqs').respond(sampleFaqs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.faqs).toEqualData(sampleFaqs);
		}));

		it('$scope.findOne() should create an array with one Faq object fetched from XHR using a faqId URL parameter', inject(function(Faqs) {
			// Define a sample Faq object
			var sampleFaq = new Faqs({
				name: 'New Faq'
			});

			// Set the URL parameter
			$stateParams.faqId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/faqs\/([0-9a-fA-F]{24})$/).respond(sampleFaq);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.faq).toEqualData(sampleFaq);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Faqs) {
			// Create a sample Faq object
			var sampleFaqPostData = new Faqs({
				name: 'New Faq'
			});

			// Create a sample Faq response
			var sampleFaqResponse = new Faqs({
				_id: '525cf20451979dea2c000001',
				name: 'New Faq'
			});

			// Fixture mock form input values
			scope.name = 'New Faq';

			// Set POST response
			$httpBackend.expectPOST('faqs', sampleFaqPostData).respond(sampleFaqResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Faq was created
			expect($location.path()).toBe('/faqs/' + sampleFaqResponse._id);
		}));

		it('$scope.update() should update a valid Faq', inject(function(Faqs) {
			// Define a sample Faq put data
			var sampleFaqPutData = new Faqs({
				_id: '525cf20451979dea2c000001',
				name: 'New Faq'
			});

			// Mock Faq in scope
			scope.faq = sampleFaqPutData;

			// Set PUT response
			$httpBackend.expectPUT(/faqs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/faqs/' + sampleFaqPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid faqId and remove the Faq from the scope', inject(function(Faqs) {
			// Create new Faq object
			var sampleFaq = new Faqs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Faqs array and include the Faq
			scope.faqs = [sampleFaq];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/faqs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFaq);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.faqs.length).toBe(0);
		}));
	});
}());