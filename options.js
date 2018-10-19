// Saves options to chrome.storage
function save_options() {
  var appmanagerurl = document.getElementById('appmanagerurl').value;
  var widgetmanagerid = document.getElementById('widgetmanagerid').value;
  var viewmanagerid = document.getElementById('viewmanagerid').value;
  var managerappidloaded = document.getElementById('managerappidloaded').checked;

  chrome.storage.sync.set({
    appmanagerurl: appmanagerurl,
    widgetmanagerid: widgetmanagerid,
    viewmanagerid: viewmanagerid,
    managerappidloaded: managerappidloaded
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    appmanagerurl: 'https://akuminatraining4.azurewebsites.net',
    widgetmanagerid: '',
    viewmanagerid: '',
    managerappidloaded: false
  }, function (items) {
    document.getElementById('appmanagerurl').value = items.appmanagerurl;
    document.getElementById('widgetmanagerid').value = items.widgetmanagerid;
    document.getElementById('viewmanagerid').value = items.viewmanagerid;
    document.getElementById('managerappidloaded').checked = items.managerappidloaded;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);