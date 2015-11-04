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