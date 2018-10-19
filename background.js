function onClickHandler(info, tab) {
    chrome.tabs.executeScript(null,
        {"file": "jquery.min.js"},
        function() {
            chrome.tabs.sendMessage(tab.id,{"message":info.menuItemId});
        });
}
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Parent
chrome.contextMenus.create({"title": "Akumina Developer Helper", "id": "root"});
//App Manager
chrome.contextMenus.create({"title": "App Manager", "parentId": "root", "id": "interChange"});
//Edit Widget Prop
chrome.contextMenus.create({"title": "Edit Widget", "parentId": "root", "id": "widgetedit"});
//Add Page
chrome.contextMenus.create({"title": "Add New Page", "parentId": "root", "id": "addpage"});
//Refresh
chrome.contextMenus.create({"title": "Refresh", "parentId": "root", "id": "refresh"});
// Refressh children
chrome.contextMenus.create({"title": "Refresh All", "parentId": "refresh", "id": "refreshCache"});
chrome.contextMenus.create({"title": "Refresh Content", "parentId": "refresh", "id": "refreshContentCache"});
chrome.contextMenus.create({"title": "Refresh Template", "parentId": "refresh", "id": "refreshTemplateCache"});
chrome.contextMenus.create({"title": "Refresh Language", "parentId": "refresh", "id": "refreshLanguageCache"});


//Management Apps
chrome.contextMenus.create({"title": "Management Apps", "parentId": "root", "id": "managementapps"});

//Management Apps Children
chrome.contextMenus.create({"title": "View Manager", "parentId": "managementapps", "id": "viewmanager"});
chrome.contextMenus.create({"title": "Widget Manager", "parentId": "managementapps", "id": "widgetmanager"});




