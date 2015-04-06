'use strict';

angular.module('roles').directive('roleUserSelector', [ 'Roles', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			templateUrl: '/modules/roles/views/partials/role-user-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getRoleUsers = function(){
					console.log('roleUser');
					if(scope.$storage.roleusers && scope.$storage.roleusers.length){
						scope.roleusers = scope.$storage.roleusers;
						console.log('$localStorage', scope.roleusers);
					} else {
						scope.roleusers = Petgenres.query();
						scope.$storage.roleusers = scope.roleusers;
						console.log('else', scope.roleusers);
					}
				};

				scope.getRoleUsers();
			}
		};
	}
]);
