let sideBar = document.getElementsByClassName("side-bar")
let mainChat = document.getElementsByClassName("mainChat")[0]
let maxBtnImg = document.getElementById("maxBtn")



let sideBarStyle = window.getComputedStyle(sideBar[0])
let bodyStyle = window.getComputedStyle(document.body)


function closeWindow() {
    window.appApi.closeWin()
}

function minWindow() {
    window.appApi.minWin()
}

function maxWindow() {
    window.appApi.isMax().then((args) => {
        if(args == false) {
            maxBtnImg.setAttribute("src", "../resources/icons/max-min-white.svg")
        }
        else if(args == true) {
            maxBtnImg.setAttribute("src", "../resources/icons/max-white.svg")
        }
    })
    window.appApi.maxWin()
}

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

window.onresize = (e) => {
    if(sideBarStyle.left == "0px")
        mainChat.style.width = `calc(100% - ${sideBarStyle.width} - 4px)`
    else
        mainChat.style.width = "100vw"
}

window.onload = (e) => {
    let title = document.querySelector("p")
    let link = document.querySelectorAll("link")
    let iconPath = ""
    title.innerText = document.querySelector("title").innerText
    for (let i = 0; i < link.length; i++) {
        const el = link[i];
        if(el.getAttribute("rel") == "shortcut icon")
            iconPath = el.getAttribute("href")
            break
    }
    document.getElementsByClassName("icon")[0].setAttribute("src", iconPath)
}