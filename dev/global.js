var x = navigator.userAgent;

var mobile = Boolean(x.match(/phone/i)) || Boolean(x.match(/android/i) || Boolean(x.match(/ipad/i)));
window.mobile = mobile;

var ie = Boolean(x.match(/IE 11.0/)) || Boolean(x.match(/MSIE/)) || Boolean(x.match(/Trident\/7.0/));
window.ie = ie;

var firefox = Boolean(x.match(/Firefox/));
window.firefox = firefox;


var isRoute = (route) =>{
    return window.location.pathname == route;
}

window.isRoute = isRoute;

// console.log(window.isRoute('/dsfds'));


