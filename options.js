document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

// Saves options to chrome.storage
function saveOptions() {
    var color = document.getElementById('color').value;
    chrome.storage.sync.set({
        trackColor: color
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores options stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({ trackColor: 'green' }, function (items) {
        document.getElementById('color').value = items.trackColor;
    });
}
