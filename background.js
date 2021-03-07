document.addEventListener('DOMContentLoaded', function() {
    allBookmarks = []
    chrome.storage.sync.get(function(items) {
        console.log(items) 
        var bookmarks = items.data
        for (const value of bookmarks) {

            //console.log(value.url)
            var div = document.createElement("div")
            div.textContent = value.url
            document.body.appendChild(div)
        }
        // Object.keys(items).forEach(function (bookmark){
        //     //console.log(items.length)
            
        //     var realBookmark = items.bookmark
        //     const div = document.createElement('div')
        //     //console.log(realBookmark)
        //     //console.log(title)
        //     //var timeFormat = realBookmark.timeCreated.getMonth() + "/" + realBookmark.timeCreated.getDate() + "/" + realBookmark.timeCreated.getFullYear();
        //     div.textContent = `${realBookmark.url}: ${realBookmark.title}, ${realBookmark.tags}`
        //     console.log(div.textContent)
        //     document.body.appendChild(div)
        // })
    })
    //chrome.storage.local.clear()
}, false)