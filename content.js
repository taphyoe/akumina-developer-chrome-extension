chrome.runtime.onMessage.addListener(function (item, sender, sendResponse) {
	var m = item.message;
	// For Manager Apps
	if (m.indexOf('manager') >= 0) {
		
		// load the values from storage
		chrome.storage.sync.get({
			appmanagerurl: 'https://akuminatraining4.azurewebsites.net',
			widgetmanagerid: '',
			viewmanagerid: '',
			managerappidloaded: false

		}, function (items) {

			var appmanagerurl = items.appmanagerurl;
			var widgetmanagerid = items.widgetmanagerid;
			var viewmanagerid = items.viewmanagerid;
			var managerappidloaded = items.managerappidloaded;
			var iserrorloading = false;
			console.log(appmanagerurl + "/api/Apps/getbytitle('')?type=admin&search=");

			if (!managerappidloaded) {
				// the values are not loaded. loading it for first time and saving them
				$.getJSON(appmanagerurl + "/api/Apps/getbytitle('')?type=admin&search=", function (data) {

					$.each(data.d.results, function (key, val) {

						if (val["Title"] == "Widget Manager") {
							widgetmanagerid = val.__metadata["uri"];
						}
						if (val["Title"] == "View Manager") {
							viewmanagerid = val.__metadata["uri"];
						}
					});

					//saving to storage
					chrome.storage.sync.set({
						appmanagerurl: appmanagerurl,
						widgetmanagerid: widgetmanagerid,
						viewmanagerid: viewmanagerid,
						managerappidloaded: true
					});

					if (m.indexOf('widgetmanager') >= 0) {
						window.open(appmanagerurl + widgetmanagerid);
					}
	
					if (m.indexOf('viewmanager') >= 0) {
						window.open(appmanagerurl + viewmanagerid);
					}


				}).fail(function () { alert("Unable to call Akumina API. " + appmanagerurl); iserrorloading = true; });
			}
			else {
				// the values are saved. loading it directly from stored values
				if (m.indexOf('widgetmanager') >= 0) {
					window.open(appmanagerurl + widgetmanagerid);
				}

				if (m.indexOf('viewmanager') >= 0) {
					window.open(appmanagerurl + viewmanagerid);
				}
			}

		});



	}	
	// For Non-Manager Apps
	else {
		// Simulating Click events of Akumina Scripts
		$('#' + item.message).click();
		// if item is refresh item , reload the page as well
		if (m.indexOf('refresh') >= 0)
			window.location.reload();
	}



	sendResponse();



});