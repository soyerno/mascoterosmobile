'use strict';

(function() {
	// Trainers Controller Spec
	describe('Trainers Controller Tests', function() {
		// Initialize global variables
		var TrainersController,
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

			// Initialize the Trainers controller.
			TrainersController = $controller('TrainersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Trainer object fetched from XHR', inject(function(Trainers) {
			// Create sample Trainer using the Trainers service
			var sampleTrainer = new Trainers({
				name: 'New Trainer'
			});

			// Create a sample Trainers array that includes the new Trainer
			var sampleTrainers = [sampleTrainer];

			// Set GET response
			$httpBackend.expectGET('trainers').respond(sampleTrainers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.trainers).toEqualData(sampleTrainers);
		}));

		it('$scope.findOne() should create an array with one Trainer object fetched from XHR using a trainerId URL parameter', inject(function(Trainers) {
			// Define a sample Trainer object
			var sampleTrainer = new Trainers({
				name: 'New Trainer'
			});

			// Set the URL parameter
			$stateParams.trainerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/trainers\/([0-9a-fA-F]{24})$/).respond(sampleTrainer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.trainer).toEqualData(sampleTrainer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Trainers) {
			// Create a sample Trainer object
			var sampleTrainerPostData = new Trainers({
				name: 'New Trainer'
			});

			// Create a sample Trainer response
			var sampleTrainerResponse = new Trainers({
				_id: '525cf20451979dea2c000001',
				name: 'New Trainer'
			});

			// Fixture mock form input values
			scope.name = 'New Trainer';

			// Set POST response
			$httpBackend.expectPOST('trainers', sampleTrainerPostData).respond(sampleTrainerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Trainer was created
			expect($location.path()).toBe('/trainers/' + sampleTrainerResponse._id);
		}));

		it('$scope.update() should update a valid Trainer', inject(function(Trainers) {
			// Define a sample Trainer put data
			var sampleTrainerPutData = new Trainers({
				_id: '525cf20451979dea2c000001',
				name: 'New Trainer'
			});

			// Mock Trainer in scope
			scope.trainer = sampleTrainerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/trainers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/trainers/' + sampleTrainerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid trainerId and remove the Trainer from the scope', inject(function(Trainers) {
			// Create new Trainer object
			var sampleTrainer = new Trainers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Trainers array and include the Trainer
			scope.trainers = [sampleTrainer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/trainers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTrainer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.trainers.length).toBe(0);
		}));
	});
}());