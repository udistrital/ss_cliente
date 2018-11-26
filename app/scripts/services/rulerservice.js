'use strict';

/**
 * @ngdoc service
 * @name ssClienteApp.rulerservice
 * @description
 * # rulerservice
 * Service in the ssClienteApp.
 */
angular.module('ssClienteApp')
  .service('rulerservice', function ($http, CONF) {

    var path = CONF.GENERAL.RULER;

    return {
      get: function (tabla,params) {
        return $http.get(path+tabla+"/?"+params);
      },
      post: function (tabla,elemento) {
        return $http.post(path+tabla,elemento);
      },
      put: function (tabla,id,elemento) {
        return $http.put(path+tabla+"/"+id,elemento);
      },
      delete: function (tabla,id) {
        return $http.delete(path+tabla+"/"+id);
      }
    };

  });
