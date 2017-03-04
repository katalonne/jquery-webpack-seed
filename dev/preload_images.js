function preloadimages(arr){
    var newimages=[], loadedimages=0
    var postaction=function(){}
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //return blank object with done() method
        done:function(f){
            postaction=f || postaction //remember user defined callback functions to be called when images load
        }
    }
}

function cutBetween(begin,end,text){
    let s = text;
    s = s.substring(s.indexOf(begin) + 1);
    return s = s.substring(0, s.indexOf(end));
}

var array = [];
var imgs = $('img');

// console.log('imgs length ' + imgs);

var length = imgs.length - 1;
for(let i=0;i<imgs.length; i++) {
    if ( (imgs[i].src.indexOf('data:image') >= 0 ) != true ) {
        // console.log(imgs[i]);
        
        // console.log('hopa este');
        array.push(imgs[i].src);
        // break;
    }
    // console.log('push ' + i);
}

var x = $('*');

for(let i = 0; i<x.length;i++) {
    if ($(x[i]).css('background-image') != 'none') {
        array.push(cutBetween('"','"',$(x[i]).css('background-image')));
    }
}


preloadimages(array).done(function(images){

    // console.log('all images preloaded');
})





