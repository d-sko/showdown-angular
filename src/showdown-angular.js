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
  })
  .directive('showdownExcerpt', function() {
    return {
      restrict: 'EA',
      require: '^ngModel',
      scope: {
        ngModel: '=',
        ngOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        var converter = new Showdown.converter(scope.ngOptions || {});
        var length = !iNaN(attrs.length) || 50;
        var end = attrs.end || '...';
        scope.$watch('ngModel', function(newValue) {
          if (newValue) {
            var strippedText = converter.makeHtml(newValue).replace(/<\/?[^>]+>/gi, '');
            var result;
            if (strippedText.length <= length || strippedText.length - end.length <= length) {
              result = strippedText;
            } else {
              result = strippedText.substring(0, length-end.length) + end;
            }
            element.text(result);
          }
        });
      }
    };
  });
