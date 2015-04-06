'use strict';

angular.module('petgenres').directive('petTypeSelector', [ 'Pettypes', '$localStorage',
	function(Pettypes, $localStorage) {
		return {
			templateUrl: '/modules/pettypes/views/partials/pet-type-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getTypes = function(){
					console.log('getTypes');
					if(scope.$storage.pettypes && scope.$storage.pettypes.length){
						scope.pettypes = scope.$storage.pettypes;
						console.log('$localStorage', scope.pettypes);
					} else {
						scope.pettypes = Pettypes.query();
						scope.$storage.pettypes = scope.pettypes;
						console.log('else', scope.pettypes);
					}
				};

				scope.getTypes();
			}
		};
	}
]);

