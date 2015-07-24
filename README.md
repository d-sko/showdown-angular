# showdown-angular

Showdown-angular is an [AngularJS](http://angularjs.org/) directive for [Showdown](https://github.com/coreyti/showdown).

## Usage

- include `showdown.js`, `angular-sanitize.js` and `showdown-angular.js` in your project (if you installed this with bower you should find them in `bower_components/showdown/src/`, `bower_components/angular-sanitize/` and `bower_components/showdown-angular/src/`)
- add `showdown-angular` to your app dependencies
- you can now use `showdown` either as element or as attribute and optionally set an `sd-options` attribute where you can provide showdown options object
  - **attribute:** set value to provide the text to parse
  - **element:** set markdown content by including a markdown file with `ng-include`
- you can also use `showdown-excerpt` with the same attributes (`showdown` and `sd-options`) for an excerpt of the content as plain text. As additional attributes you can set `length` to define after how many characters the text is cut of (default: 50) and `end` to set the text that should be applied to the end (default: '...')
 - a note about performance: `showdown-excerpt` does the same markdown parsing as `showdown` and removes all html tags with regex.

### Example
This example assumes there is a `$scope.markdown` variable which contains the markdown-string to parse.

- element:
 ```
 <showdown sd-options="{extensions: ['table']}" ng-include="'some-markdown.md'"></showdown>
 ```
- attribute:
 ```
 <div showdown="markdown" sd-options="{extensions: ['table']}"></div>
 ```
