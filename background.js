document.addEventListener('DOMContentLoaded', function() {
    allBookmarks = []
    chrome.storage.local.get(null, function(items) {
        Object.keys(items).forEach(function (bookmark){
            console.log(items)

            var realBookmark = items.bookmark
            const div = document.createElement('div')
            console.log(realBookmark)
            //console.log(title)
            //var timeFormat = realBookmark.timeCreated.getMonth() + "/" + realBookmark.timeCreated.getDate() + "/" + realBookmark.timeCreated.getFullYear();
            div.textContent = `${realBookmark.url}: ${realBookmark.title}, ${realBookmark.tags}`
            document.body.appendChild(div)
        })
    })
    //chrome.storage.local.clear()
}, false)