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

        // filter!!
        /**
        * Create a function to generate your elements based
        * off the passed in array of data
        */
        function makeList(data) {
            var paras = document.getElementsByClassName("websiteBlock")
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0])
            }
            
            for (const d of data) {
                if (d instanceof HTMLDivElement) {
                    document.body.appendChild(d)
                } else {
                    var div = document.createElement("div")
                    div.setAttribute("class", "websiteBlock")

                    var a = document.createElement("a")
                    a.setAttribute("href", d.url)
                    a.setAttribute("class", "link")
                    a.innerHTML = d.title
                    div.appendChild(a)
                    var br = document.createElement("br")
                    div.appendChild(br)

                    var br1 = document.createElement("br")
                    div.appendChild(br1)
                    console.log(d.tags)
                    var tagsList = d.tags
                    for(var tag of tagsList){
                        var divTag = document.createElement("div")
                        divTag.setAttribute("class", "tag")
                        divTag.innerHTML = tag
                        div.appendChild(divTag)
                    }
                    //div.textContent = value.url
                    document.body.appendChild(div)
                }
            }
        }
        
        /**
         * Create an event listener to react to
         * search updates so you can filter the list.
         * keyUp is used so that you wait for the
         * user to actually finish typing that specific
         * char before running. Otherwise, you'll be missing
         * a char. (Try changing it to 'keypress' and see what happens)
         */
        document.getElementById('query').addEventListener('keyup', function(e) {
            // Get the textbox value
            const searchTerm = e.target.value;
            // If no value, reset the list to all items
            if (!searchTerm) {
                makeList(items.data);
                return;
            }
            // Filter your list of data
            // based off the searchTerm
            const allWebsiteBlocks = document.getElementsByClassName("websiteBlock")
            //console.log(allWebsiteBlocks)
            const filteredWebsites = Array.prototype.filter.call(allWebsiteBlocks, function(webBlock) {
                var currTags = webBlock.getElementsByClassName("tag")
                var isFound = false
                for(var tag of currTags){
                    isFound = isFound || tag.innerHTML.includes(searchTerm)
                }
                return (
                    webBlock.childNodes[0].innerHTML.includes(searchTerm) || isFound
                )
            })
            
            // Pass the list filtered list of data to your makeList function
            // to generate your html
            makeList(filteredWebsites);
        });
        
        // Generate your initial list
        makeList(items.data);
        
    })
    // chrome.storage.sync.clear()
}, false)