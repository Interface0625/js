
/*
 * Quick n' dirty implementation of include.
 * Possible slowdown if "done_callback" is used.
 * Acceptable urls: *.css, *.js
 * Pass an Array as url for batch loading.
 */
function include(url, done_callback) {
    // Assure that urls is an array.
    var urls = ( url instanceof Array ? url : [ url ] );
    for(var i = 0; i < urls.length; i++){
        var _url = urls[i];
        var element;

        // Check type and create the element.
        switch (_url.split(".").pop()) {
            case "css":
                element = document.createElement("link");
                element.setAttribute("rel", "stylesheet");
                element.setAttribute("type", "text/css");
                element.setAttribute("href", _url);
                break;
            case "js":
                element = document.createElement("script");
                element.setAttribute("language", "javascript");
                element.setAttribute("src", _url);
                break;
            default:
                window.console.error("could not identify", _url, "skip include");
                return;
        }

        // Append the element to the head.
        var head = document.querySelector("head");
        if (head.innerHTML.indexOf(element.outerHTML) != -1) {
            window.console.warn("Duplicate include, skipping:", _url);
        } else {
            head.appendChild(element);
        }
    }

    // Check if document is complete.
    if(done_callback){
        var check = setInterval(function (){
            if (document.readyState !== 'complete'){ return; }
            clearInterval(check);
            done_callback();
        }, 100);
    }
}
