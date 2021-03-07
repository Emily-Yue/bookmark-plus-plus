document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(function(items) {
        console.log(items) 
        var bookmarks = items.data

        // add input box of search bar
        const searchBar = document.createElement("input")
        searchBar.setAttribute("type","search")
        searchBar.setAttribute("id","query")
        searchBar.setAttribute("placeholder","Search...")
        searchBar.setAttribute("name","Search")
        document.body.appendChild(searchBar)
        // add search button
        const searchBarButton = document.createElement("button")
        searchBarButton.setAttribute("id","search_bar_button")
        searchBarButton.innerHTML = "Search"
        document.body.appendChild(searchBarButton)

        for (const value of bookmarks) {
            //console.log(value.url)
            var div = document.createElement("div")
            div.setAttribute("class", "websiteBlock")

            var a = document.createElement("a")
            a.setAttribute("href", value.url)
            a.setAttribute("class", "link")
            a.innerHTML = value.title
            div.appendChild(a)
            var br = document.createElement("br")
            div.appendChild(br)

            var br1 = document.createElement("br")
            div.appendChild(br1)
            
            var tagsList = value.tags
            for(var tag of tagsList){
                var divTag = document.createElement("div")
                divTag.setAttribute("class", "tag")
                divTag.innerHTML = tag
                div.appendChild(divTag)
            }
            //div.textContent = value.url
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