
let sideBar = document.getElementsByClassName("side-bar")
let mainChat = document.getElementsByClassName("mainChat")[0]
let newsDiv = document.getElementById("News")

let sideBarStyle = window.getComputedStyle(sideBar[0])
let bodyStyle = window.getComputedStyle(document.body)



function toggleSideBar() {
    let left = sideBarStyle.left
    if(left == "0px") {
        sideBar[0].style.left = "-350px"
        mainChat.style.left = "0px"
        mainChat.style.width = "100%"
    }
    else {
        sideBar[0].style.left = "0px"
        mainChat.style.left = "unset"
        mainChat.style.width = `calc(100% - ${sideBarStyle.width} - 4px)`
    }
}

window.onresize = () => {
    let width = sideBarStyle.width
    if(sideBarStyle.left == "0px") {
        mainChat.style.width = `calc(100vw - ${width} - 4px)`
    }
    else
        mainChat.style.width = "100vw"
    dynamicMaxBtn()
}

function checkOnline() {
    let isOnline = navigator.onLine
    if(isOnline == true)
        return
}

setInterval(() => {
    checkOnline()
}, 2000)


function getNews() {
    let path = "src/python/api/news.py"
    let options = {
        mode: 'json',
        args: [""],
        pythonOptions: ['-u'],
    }
    window.appApi.pythonRun(path, options)
}


function openNewsInWindow(e) {
    let url = e.dataset.url
    window.appApi.openNewsInWin(url)
}



async function addNews(e) {
    let abstract = e.data[0]
    let newsHeadlines = e.data[1]
    let webUrl = e.data[2]
    let imgUrl = e.data[3]
    let author = e.data[4]
    for (let i = 0; i < abstract.length; i++) {
        const el = abstract[i];
        let code = `
        <div class="newsTab" data-url="${webUrl[i]}" onclick="openNewsInWindow(this)">
        <div>
            <img src="${imgUrl[i]}"></img>
            <div>
                <h3>${newsHeadlines[i]}</h3>
                <p>${abstract[i]}</p>
            </div>
        </div>
    </div>
        `
        await newsDiv.insertAdjacentHTML("beforeend", code)
    }
}


window.onmessage = async (e) => {
    if(e.source !== window) return
    addNews(e)
    console.table(e.data)
}
