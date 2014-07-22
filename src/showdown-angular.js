'use strict';

angular.module('showdown-angular', ['ngSanitize'])
  .directive('showdown', function ($sanitize) {
    return {
      restrict: 'EA',
      require: '^ngModel',
      scope: {
        ngModel: '=',
        ngOptions: '='
      },
      link: function postLink(scope, element) {
        var converter = new Showdown.converter(scope.ngOptions || {});
        scope.$watch('ngModel', function(newValue) {
          element.html(newValue ? $sanitize(converter.makeHtml(newValue)) : '');
        });
      }
    };
  });
