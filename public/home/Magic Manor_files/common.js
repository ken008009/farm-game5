require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({4:[function(require,module,exports){
"use strict";

// 这里会显示两个对话框: 一个里面的文本为 "Olá World"
// 另一个的文本为 "Good morning John!"

var lang = 'en';
var getLang = function getLang() {
  return sessionStorage.getItem('lang');
};
var setLang = function setLang(lang) {
  return sessionStorage.setItem('lang', lang);
};
if (getLang()) {
  lang = getLang();
}
jQuery.i18n.properties({
  name: 'Messages',
  path: 'locales/',
  mode: 'both',
  language: lang,
  checkAvailableLanguages: true,
  async: true,
  callback: function callback() {
    // 我们指定的模式: 'both' ，所以翻译的值会将作为JS的变量/方法和一个map
    $('[data-locale]').each(function () {
      var key = $(this).attr('data-locale');
      $(this).text($.i18n.prop(key));
    });
  }
});
$('#lang-btn').on('click', function (e) {
  var target = getLang() === 'cn' ? 'en' : 'cn';
  setLang(target);
  location.reload();
});

},{}],3:[function(require,module,exports){
"use strict";

var navMenu = $('.nav-drop');
var navBtn = $('.nav-btn');
var navCloseBtn = $('.nav-close-btn');
navBtn.on('click', function () {
  navMenu.addClass('active');
});
navCloseBtn.on('click', function () {
  navMenu.removeClass('active');
});

},{}]},{},[]);
