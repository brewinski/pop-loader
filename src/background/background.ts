chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.type === "DOWNLOAD_VIDEO") {
		chrome.downloads.download({
			url: msg.url,
			saveAs: true
		});
	}

	if (msg.type === "OPEN_VIDEO_INCOGNITO") {
		chrome.windows.create({
			url: msg.url,
			incognito: true
		}).then((result) => {
			console.info("[brewinski]: OPEN_VIDEO_INCOGNITO result", result)
		}).catch((err) => {
			console.error("[brewinski]: OPEN_VIDEO_INCOGNITO error", err)
		});
	}
});

