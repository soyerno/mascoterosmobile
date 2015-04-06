'use strict';

angular.module('imageuploaders')
	.filter('cloudinaryProfile', [
		function() {
			return function(input) {
				// Cloudinary directive logic
				// ...
        if (!input) return;
				var res = input.split("/upload/");
				input = res[0]+ '/upload/w_150,h_150,c_thumb/' + res[1];
				return input;
			};
		}
	])
	.filter('cloudinaryProfileBlured', [
		function() {
			return function(input) {
				// Cloudinary directive logic
				// ...
        if (!input) return;
				var res = input.split("/upload/");
				input = res[0]+ '/upload/w_250,h_250,c_thumb,e_blur:500/' + res[1];
				return input;
			};
		}
	]);
