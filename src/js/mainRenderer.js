
let sideBar = document.getElementsByClassName("side-bar")
let mainChat = document.getElementsByClassName("mainChat")[0]
let newsDiv = document.getElementById("News")
let loadStatus = document.getElementById("loading-status")

let sideBarStyle = window.getComputedStyle(sideBar[0])
let bodyStyle = window.getComputedStyle(document.body)
let canAddData = false
let newsPage = 0


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


function getNews(page) {
    loadStatus.style.top = "40px"
    let path = "src/python/api/news.py"
    let options = {
        mode: 'json',
        args: ["", page],
        pythonOptions: ['-u'],
    }
    window.appApi.pythonRun(path, options)
}


function openNewsInWindow(e) {
    let url = e.dataset.url
    window.appApi.openNewsInWin(url)
}



async function addNews(e) {
    if(navigator.onLine == false) return
    let abstract = e.data[0]
    let newsHeadlines = e.data[1]
    let webUrl = e.data[2]
    let imgUrl = e.data[3]
    let author = e.data[4]
    for (let i = 0; i < abstract.length; i++) {
        let code = `
        <div class="newsTab" data-url="${webUrl[i]}" onclick="openNewsInWindow(this)">
        <div>
            <img src="${imgUrl[i]}"></img>
            <div>
                <h3>${newsHeadlines[i]}</h3>
                <p>${abstract[i]}</p>
                <p><strong id="author">${author[i]}</strong></p>
            </div>
        </div>
    </div>
        `
        await newsDiv.insertAdjacentHTML("beforeend", code)
    }
}


window.onmessage = async (e) => {
    if(e.source !== window) return
    addNews(e).then(() => {loadStatus.style.top = "-250px";})
    canAddData = true
    newsPage += 10
}

newsDiv.onscroll = () => {
    let isBottom = newsDiv.scrollTop === (newsDiv.scrollHeight -newsDiv.offsetHeight) ? true: false
    if(isBottom === true && canAddData === true) {
        getNews(newsPage)
        canAddData = false
    }
}