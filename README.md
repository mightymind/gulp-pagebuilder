# [gulp](https://github.com/wearefractal/gulp)-pagebuilder

Pagebuilder is a build and real time include engine for HTML, JavaScript, CSS and in general any type of text file that you wish to might want to "include" other files into.

## Install

Install with [npm](https://npmjs.org/package/gulp-pagebuilder).

```
npm install --save-dev gulp-pagebuilder
```

## Examples

```js
var gulp = require('gulp'),
	pagebuilder = require('gulp-pagebuilder'));

gulp.task('default', function () {
	gulp.src('src/*.html')
		.pipe(pagebuilder('src'))
		.pipe(gulp.dest('build/'));
});
```

## How use it in sources

```html
<div class="someclass" >
	[snp tpl="some/block/in/src/somefile.html" class="foo bar" ]
</div>
```

## Content of some/block/in/src/somefile.html

```html
<div class="otherclass {class}" >
	Some content
</div>
```

## Result after compile

```html
<div class="someclass" >
	<div class="otherclass foo bar" >
		Some content
	</div>
</div>
```
