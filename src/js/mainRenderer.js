let sideBar = document.getElementsByClassName("side-bar")
let mainChat = document.getElementsByClassName("mainChat")[0]

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