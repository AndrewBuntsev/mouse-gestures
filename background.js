let active = true;

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    // chrome.tabs.query({ active: true, currentWindow: true },
    //     function (tabs) {
    //         var activeTab = tabs[0];
    //         chrome.tabs.sendMessage(activeTab.id,
    //             { "message": "clicked_browser_action" }
    //         );
    //     });

    active = !active;
    chrome.storage.sync.set({
        active: active
    });

    chrome.browserAction.setIcon({ path: active ? "/icons/icon16.png" : "/icons/icon16off.png" });
    chrome.browserAction.setTitle({ title: active ? 'Mouse Gestures\nActive' : 'Mouse Gestures\nInactive' });
});