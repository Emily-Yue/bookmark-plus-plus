document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add').addEventListener('click', onclick, false)
    function onclick(){
        chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, tabs[0], getInfo)
        })
    }

    //all bookmarks, should open up a seperate page
    document.getElementById('seeAll').addEventListener('click', onclick3, false)
    function onclick3(){
        chrome.tabs.create({url: 'background.html'})
    }

    //function that get's the link and title, also makes the form
    function getInfo(res){
        //remove the add link button
        document.getElementById("add").remove()
        
        //url input, should auto fill for them
        const inputUrl = document.createElement("input")
        inputUrl.setAttribute("type", "url");
        inputUrl.setAttribute("id", "urlInput");
        console.log(res)
        inputUrl.value = `${res.link}`
        document.body.appendChild(inputUrl);

        //title input
        const inputTitle = document.createElement("input")
        inputTitle.setAttribute("type", "text");
        inputTitle.setAttribute("id", "titleInput");
        inputTitle.value = `${res.title}`
        //inputTitle.setAttribute("placeholder", `${res.title}`);
        document.body.appendChild(inputTitle);
        
        //tags input
        const inputTags = document.createElement("input")
        inputTags.setAttribute("type", "text")
        inputTags.setAttribute("id", "tagInput");
        inputTags.setAttribute("placeholder", "tags1, tags2, tags3")
        document.body.appendChild(inputTags);
       
        //submit button
        const submitButton = document.createElement("button")
        submitButton.setAttribute("id", "submit")
        submitButton.innerHTML = "Submit"
        document.body.appendChild(submitButton)
        document.getElementById('submit').addEventListener('click', onclick2, false)

    }
    
    function onclick2() { 
        var currentTime= new Date();
        var tagsList = document.getElementById("tagInput").value.split(",");
        //var timeFormat = currentTime.getMonth() + "/" + currentTime.getDate() + "/" + currentTime.getFullYear();
        var uniqueId = Date.now()
        var bookmark = {
            title: document.getElementById("titleInput").value, 
            url: document.getElementById("urlInput").value,
            key: uniqueId,
            timeCreated: currentTime, 
            tags: tagsList
        }
        chrome.storage.sync.set({uniqueId: bookmark}, function() {
            //clear everything but see all bookmarks page
            document.getElementById("submit").remove()
            document.getElementById("titleInput").remove()
            document.getElementById("tagInput").remove()
        })
    }
}, false)