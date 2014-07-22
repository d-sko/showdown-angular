# showdown-angular

Showdown-angular is an [AngularJS](http://angularjs.org/) directive for [Showdown](https://github.com/coreyti/showdown).

## Usage

- include `showdown.js`, `angular-sanitize.js` and `showdown-angular.js` in your project (if you installed this with bower you should find them in `bower_components/showdown/src/`, `bower_components/angular-sanitize/` and `bower_components/showdown-angular/src/`)
- add `showdown-angular` to your app dependencies
- you can now use `showdown` either as element or as attribute, add an `ng-model` attribute to provide the text to parse and optionally an `ng-options` attribute where you can provide showdown options object
- you can also use `showdown-excerpt` with the same attributes (`ng-model` and `ng-options`) for an excerpt of the content as plain text. As additional attributes you can set `length` to define after how many characters the text is cut of (default: 50) and `end` to set the text that should be applied to the end (default: '...')
 - a note about performance: `showdown-excerpt` does the same markdown parsing as `showdown` and removes all html tags with regex.

### Example
This example assumes there is a `$scope.markdown` variable which contains the markdown-string to parse.

- element:
 ```
 <showdown ng-model="markdown" ng-options="{extensions: ['table']}"></showdown>
 ```
- attribute:
 ```
 <div showdown ng-model="markdown" ng-options="{extensions: ['table']}"></div>
 ```
