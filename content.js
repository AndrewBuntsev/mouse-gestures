
let gestureTrack = [];
let trackColor = 'green';
let active = true;

chrome.storage.sync.get({ trackColor: 'green', active: true }, function (items) {
    trackColor = items.trackColor;
    active = items.active;
});


chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.sync.get('trackColor', function (items) {
        trackColor = items.trackColor;
    });
    chrome.storage.sync.get('active', function (items) {
        active = items.active;
    });
});

window.addEventListener('contextmenu', function (e) {
    if (gestureTrack.length > 0) {
        e.preventDefault();
    }
}, false);

document.addEventListener('mousemove', e => {
    if (e.buttons == 0) {
        // release track
        if (gestureTrack.length > 5) {
            gestureTrack[0].x < gestureTrack[gestureTrack.length - 1].x ? history.forward() : history.back();
        }

        gestureTrack.forEach(p => {
            p.element.remove();
        });
        gestureTrack = [];
    }
    else if (e.buttons == 2 && active) {
        // right button is down
        const trackPoint = document.createElement('div');
        trackPoint.classList.add('trackPoint');
        trackPoint.style.top = `${e.clientY}px`;
        trackPoint.style.left = `${e.clientX}px`;
        trackPoint.style.border = `3px solid ${trackColor}`;
        document.body.appendChild(trackPoint);

        gestureTrack.push({ x: e.clientX, y: e.clientY, element: trackPoint });
    }
});

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.message === "clicked_browser_action") {
//             
//         }
//     }
// );


