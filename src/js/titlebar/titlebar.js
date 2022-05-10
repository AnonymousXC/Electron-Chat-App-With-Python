

function closeWindow() {
    window.appApi.closeWin()
}

function minWindow() {
    window.appApi.minWin()
}

function maxWindow() {
    dynamicMaxBtn()
    window.appApi.maxWin()
}

async function dynamicMaxBtn() {
    let maxBtnImg = document.getElementById("maxBtn")
    window.appApi.isMax().then((args) => {
        if(args == true) {
            maxBtnImg.setAttribute("src", "../resources/icons/max-min-white.svg")
        }
        else if(args == false) {
            maxBtnImg.setAttribute("src", "../resources/icons/max-white.svg")
        }
    })
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
    getNews()

}