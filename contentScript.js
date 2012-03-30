chrome.extension.onRequest.addListener(function(command, sender, sendResponse) {
    if (command == "openSelectedUrls") {
        var urls = new Array();
        var selection = window.getSelection();
        var doc = window.document;
        if (selection.type != 'Range') {
            // Look for selection within iframes on the page instead
            var fs = document.getElementsByTagName('iframe');
            var f;
            for (var i = 0; f = fs[i]; i++) {
                try {
                    doc = f.contentDocument;
                    selection = doc.getSelection();
                    if (selection.type == 'Range') {
                        break;
                    }
                }
                catch(e)
                {
                    continue;
                }
            }
        }
        var hrefs = doc.links;
        for (i = 0; i < hrefs.length; i++) {
            if (selection.containsNode(hrefs[i], true)) {
                urls.push(hrefs[i].href);
            }
        }
        sendResponse({
            "urls": urls,
            "fromUrl": document.location.href
        });
    }
});
