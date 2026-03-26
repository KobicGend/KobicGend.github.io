import gulp from 'gulp';
import htmlMinifier from 'gulp-html-minifier-terser';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import fontmin from 'gulp-fontmin';

// 1. 压缩 HTML - 它已经包含了清除注释和空格的功能，不需要额外的 htmlclean
export const minifyHtml = () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlMinifier({
            removeComments: true,       // 清除 HTML 注释
            collapseWhitespace: true,   // 压缩空格
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            minifyJS: true,             // 压缩内联 JS
            minifyCSS: true             // 压缩内联 CSS
        }))
        .pipe(gulp.dest('./public'));
};

// 2. 压缩 CSS
export const minifyCss = () => {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public'));
};

// 3. 压缩 JS
export const minifyJs = () => {
    return gulp.src('./public/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./public'));
};

// 4. 定义默认组合任务
const build = gulp.series(
    gulp.parallel(minifyHtml, minifyCss, minifyJs)
);

export default build;