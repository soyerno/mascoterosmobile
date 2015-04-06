'use strict';

angular.module('petgenres').directive('petGenreSelector', [ 'Petgenres', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			templateUrl: '/modules/petgenres/views/partials/pet-genre-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getGenres = function(){
					console.log('getGenres');
					if(scope.$storage.petgenres && scope.$storage.petgenres.length){
						scope.petgenres = scope.$storage.petgenres;
						console.log('$localStorage', scope.petgenres);
					} else {
						scope.petgenres = Petgenres.query();
						scope.$storage.petgenres = scope.petgenres;
						console.log('else', scope.petgenres);
					}
				};

				scope.getGenres();
			}
		};
	}
]);
