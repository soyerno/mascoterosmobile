'use strict';

//Imageuploaders service used to communicate Imageuploaders REST endpoints
angular.module('imageuploaders').factory('Upload', ['$window','$q','Restangular', function ($window, $q, Restangular) {
  return {
    parse: function (fields) {

      var result = $q.defer(),
        requests = [],
        that = this;

      angular.forEach(fields, function (fieldData, field) {
        var deferred = $q.defer(), data;
        if (fieldData instanceof $window.File) {
          requests.push(deferred.promise);
          data = new FormData();
          data.append('file', fieldData);
          if (fieldData.imageProvider) {
            data.append('imageProvider', fieldData.imageProvider);
          }

          Restangular
            .one('upload')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(data, null, {}, {'Content-Type': undefined})
            .then(function (file) {
              fields[field] = file.url;
              deferred.resolve();
            });
        } else if (fieldData !== null && typeof fieldData === 'object') {
          requests.push(deferred.promise);
          that.parse(fields[field]).then(function () {
            deferred.resolve();
          });
        }
      });

      $q.all(requests).then(function () {
        result.resolve();
      });

      return result.promise;
    }
  };
}]);
