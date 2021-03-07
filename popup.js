document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add').addEventListener('click', onclick, false)
    function onclick(){
        chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, tabs[0], getInfo)
        })
    }
    //function that get's the link and title, also makes the form
    function getInfo(res){
        //remove the add link button
        document.getElementById("add").remove()
        const inputTitle = document.createElement("input")
        inputTitle.setAttribute("type", "text");
         
        // const div = document.createElement('div')
        // div.textContent = `${res.link}`
        // document.body.appendChild(div)
    }
}, false)