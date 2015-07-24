'use strict';

angular.module('showdown-angular', ['ngSanitize'])
  .directive('showdown', ['$sanitize', function ($sanitize) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        showdown: '=',
        sdOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        var converter = new showdown.Converter(scope.sdOptions);
        setText(scope.showdown || element.text() || '');

        if (attrs.showdown) {
          scope.$watch('showdown', setText);
        }

        function setText(text) {
          // the following is a dirty hack to keep tasklists through $sanitize
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
        };
      }
    };
  }])
  .directive('showdownExcerpt', function() {
    return {
      restrict: 'EA',
      scope: {
        showdown: '=',
        sdOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        var converter = new showdown.Converter(scope.sdOptions || {});
        var length = !isNaN(attrs.length) ? attrs.length : 50;
        var end = attrs.end || '...';
        scope.$watch('showdown', function(newValue) {
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
