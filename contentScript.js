chrome.extension.onRequest.addListener(function(command, sender, sendResponse)
{
    if (command == "openSelectedUrls")
    {
        var urls = new Array();
        var selection = window.getSelection();
        var hrefs = document.links;
        for (i = 0; i < hrefs.length; i++)
        {
            if (selection.containsNode(hrefs[i], true))
            {
                urls.push(hrefs[i].href);
            }
        }
        sendResponse({"urls":urls, "fromUrl":document.location.href});
    }
});

