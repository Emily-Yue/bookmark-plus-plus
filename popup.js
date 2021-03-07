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
        inputTitle.value = res.title
        document.body.appendChild(inputTitle);
        const inputTags = document.createElement("input")
        inputTags.setAttribute("type", "text")
        inputTags.value = "tag1, tag2, tag3"
        document.body.appendChild(inputTags);
        const submitButton = document.createElement("button")
        submitButton.setAttribute("id", "submit")
        // submitButton.setAttribute("onclick", "onclick2()")
        submitButton.innerHTML = "Submit"
        document.body.appendChild(submitButton)
        document.getElementById('submit').addEventListener('click', onclick2, false)
        // const div = document.createElement('div')
        // div.textContent = `${res.link}`
        // document.body.appendChild(div)
    }
    
    function onclick2() {
        console.log("bitkldsjfas")
        document.getElementById("submit").remove()
    }
}, false)