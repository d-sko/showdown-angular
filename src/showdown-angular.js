angular.module('showdown-angular', ['ngSanitize'])
  .provider('showdown', function() {
    'use strict';
    var self = this;

    this.setOptions = function(options) {
      this.defaultOptions = options;
    };

    this.$get = ['$window', '$log', function($window, $log) {
      return function(options) {
        var sd = (function() {
          if (typeof module !== 'undefined' && typeof exports === 'object') {
            return require('showdown');
          } else {
            return $window.showdown || showdown;
          }
        })();

        if (angular.isUndefined(sd)) {
          $log.error('showdown is not available!');
          return;
        }
        var converterOptions = angular.merge({}, self.defaultOptions, options || {});
        return new sd.Converter(converterOptions);
      };
    }];
  })
  .directive('showdown', ['$sanitize', 'showdown', function ($sanitize, showdown) {
    'use strict';
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        showdown: '=',
        sdOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        var converter = showdown(scope.sdOptions);
        setText(scope.showdown || element.text() || '');

        if (attrs.showdown) {
          scope.$watch('showdown', setText);
        }

        function setText(text) {
          if (text){
            var convertedText = converter.makeHtml(text);
            // the following is a dirty hack to keep tasklists through $sanitize
            if (converter.getOption('tasklists') === true) {
              var checkbox = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;">';
              var checkboxChecked = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;" checked>';
              var checkboxMask = '_sdtlm1_';
              var checkboxCheckedMask = '_sdtlm2_';
              convertedText = convertedText.replace(new RegExp(checkbox, "g"), checkboxMask);
              convertedText = convertedText.replace(new RegExp(checkboxChecked, "g"), checkboxCheckedMask);
              convertedText = $sanitize(convertedText);
              convertedText = convertedText.replace(new RegExp(checkboxMask, "g"), checkbox);
              convertedText = convertedText.replace(new RegExp(checkboxCheckedMask, "g"), checkboxChecked);
            } else {
              convertedText = $sanitize(convertedText);
            }
            element.html(convertedText);
          } else {
            element.html('');
          }
        }
      }
    };
  }])
  .directive('showdownExcerpt', ['showdown', function(showdown) {
    return {
      restrict: 'EA',
      scope: {
        showdownExcerpt: '=',
        sdOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        var converter = showdown(scope.sdOptions || {});
        var length = !isNaN(attrs.length) ? attrs.length : 50;
        var end = attrs.end || '...';
        scope.$watch('showdown-excerpt', function(newValue) {
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
  }]);
