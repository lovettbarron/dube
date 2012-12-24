/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/
var dube = dube || {};
dube.about = false;
dube.play = true;
dube.mute = false;
dube.main = 'wp-content/themes/eddiemachado-bones-bd0ff66/'
dube.img = dube.main + 'images/';
// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    
    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {
    
    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {
        
    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {
    
        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
        
    }
    
    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {
        
    }
    
	

    callPlayer("player", function() {
        // This function runs once the player is ready ("onYouTubePlayerReady")
        callPlayer("player", "playVideo");
        callPlayer("player", "mute");
    });
    // When the player is not ready yet, the function will be queued.
    // When the iframe cannot be found, a message is logged in the console.

	// add all your scripts here
	
    // About overlay
    $('a[href="#about"]').click( function(e) {
        e.preventDefault;
        var target = '#about';
        if(!dube.about) $(target).fadeIn(400);
        else $(target).fadeOut(400);
        dube.about = !dube.about;
    })

    $('a[href="#next"]').click(function(e) {
        // placeholder for go to next vide
    });
    $('a[href="#prev"]').click(function(e) {
        // placeholder for go to prev vide
    });
    $('a[href="#play"]').click(function(e) {
        // placeholder for go to prev vide
         if(dube.play) {
            // Playvideo
            callPlayer("player", "playVideo");
            $('img.play').attr('src', dube.img + 'playon.png');
        } else {
            callPlayer("player", "pauseVideo");
            $('img.play').attr('src', dube.img + 'playoff.png');
        }

        dube.play = !dube.play;
    });
    $('a[href="#mute"]').click(function(e) {

        if(dube.mute) {
            // mute video
            callPlayer("player", "mute");
            $('img.mute').attr('src', dube.img + 'muteon.png');
        } else {
            callPlayer("player", "unMute");
            $('img.mute').attr('src', dube.img + 'muteoff.png');
        }

        dube.mute = !dube.mute;
    });
 

    $.get( dube.main + 'video.php?p=' + dube.mostRecent, function(data) {
        $('#main').html(data);
    });

}); /* end of as page load scripts */


/**
 * @author       Rob W <gwnRob@gmail.com>
 * @website      http://stackoverflow.com/a/7513356/938089
 * @version      20120724
 * @description  Executes function on a framed YouTube video (see website link)
 *               For a full list of possible functions, see:
 *               https://developers.google.com/youtube/js_api_refere    nce
 * @param String frame_id The id of (the div containing) the frame
 * @param String func     Desired function to call, eg. "playVideo"
 *        (Function)      Function to call when the player is ready.
 * @param Array  args     (optional) List of arguments to pass to function func*/
function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }

    // When the player is not ready yet, add the event to a queue
    // Each frame_id is associated with an own queue.
    // Each queue has three possible states:
    //  undefined = uninitialised / array = queue / 0 = ready
    if (!callPlayer.queue) callPlayer.queue = {};
    var queue = callPlayer.queue[frame_id],
        domReady = document.readyState == 'complete';

    if (domReady && !iframe) {
        // DOM is ready and iframe does not exist. Log a message
        window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
        if (queue) clearInterval(queue.poller);
    } else if (func === 'listening') {
        // Sending the "listener" message to the frame, to request status updates
        if (iframe && iframe.contentWindow) {
            func = '{"event":"listening","id":' + JSON.stringify(''+frame_id) + '}';
            iframe.contentWindow.postMessage(func, '*');
        }
    } else if (!domReady || iframe && (!iframe.contentWindow || queue && !queue.ready)) {
        if (!queue) queue = callPlayer.queue[frame_id] = [];
        queue.push([func, args]);
        if (!('poller' in queue)) {
            // keep polling until the document and frame is ready
            queue.poller = setInterval(function() {
                callPlayer(frame_id, 'listening');
            }, 250);
            // Add a global "message" event listener, to catch status updates:
            messageEvent(1, function runOnceReady(e) {
                var tmp = JSON.parse(e.data);
                if (tmp && tmp.id == frame_id && tmp.event == 'onReady') {
                    // YT Player says that they're ready, so mark the player as ready
                    clearInterval(queue.poller);
                    queue.ready = true;
                    messageEvent(0, runOnceReady);
                    // .. and release the queue:
                    while (tmp = queue.shift()) {
                        callPlayer(frame_id, tmp[0], tmp[1]);
                    }
                }
            }, false);
        }
    } else if (iframe && iframe.contentWindow) {
        // When a function is supplied, just call it (like "onYouTubePlayerReady")
        if (func.call) return func();
        // Frame exists, send message
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
    /* IE8 does not support addEventListener... */
    function messageEvent(add, listener) {
        var w3 = add ? window.addEventListener : window.removeEventListener;
        w3 ?
            w3('message', listener, !1)
        :
            (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
    }
}




/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );