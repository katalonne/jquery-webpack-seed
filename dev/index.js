// var unu = require('./html/one/1.js');
// var doi = require('./html/two/2.js');
// var trei = require('./html/three/3.js');

// import $ from 'jquery';
// import * as sr from 'scrollreveal';

// import * as paraxify from './assets/Paraxify/paraxify.js';
import './global.js';
import './preload_images';


import './main/main';


import './styles.scss';




var body = document.body,
  timer;

var getWindowWidth = function() {
        var windowWidth = 0;
        if (typeof (window.innerWidth) == 'number') {
            windowWidth = window.innerWidth;
        }
        else {
            if (document.documentElement && document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            }
            else {
                if (document.body && document.body.clientWidth) {
                    windowWidth = document.body.clientWidth;
                }
            }
        }
        return windowWidth;
    }

window.getWindowWidth = getWindowWidth;

// window.addEventListener('scroll', function () {
//   clearTimeout(timer);
//   if (!body.classList.contains('disable-hover')) {
//     body.classList.add('disable-hover')
//   }

//   timer = setTimeout(function () {
//     body.classList.remove('disable-hover')
//   }, 50);
// }, false);


// function getWindowWidth() {
//   var windowWidth = 0;
//   if (typeof (window.innerWidth) == 'number') {
//     windowWidth = window.innerWidth;
//   }
//   else {
//     if (document.documentElement && document.documentElement.clientWidth) {
//       windowWidth = document.documentElement.clientWidth;
//     }
//     else {
//       if (document.body && document.body.clientWidth) {
//         windowWidth = document.body.clientWidth;
//       }
//     }
//   }
//   return windowWidth;
// }

// window.getWindowWidth = getWindowWidth();