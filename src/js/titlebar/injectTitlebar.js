let filename = window.location.pathname.split("/").slice(-1)[0];



let comBar = `
    <div id="titleBar">
    <div class="leftItems">
        <img class="icon">
        <p></p>
    </div>
    <div class="rightItems">
        <button class="barBtn" onclick="minWindow()">
            <img src="../resources/icons/min-white.svg">
        </button>
        <button class="barBtn" onclick="maxWindow()">
            <img src="../resources/icons/max-white.svg" id="maxBtn">
        </button>
        <button class="barBtn" onclick="closeWindow()">
            <img src="../resources/icons/x-lg.svg">
        </button>
    </div>
    </div>
`


let _TitleBar = `
    <div id="titleBar">
    <div class="leftItems">
        <button class="barBtn" onclick="toggleSideBar()">
            <i class="bi bi-list"></i>
        </button>
        <img class="icon">
        <p></p>
    </div>
    <div class="rightItems">
        <button class="barBtn" onclick="minWindow()">
            <img src="../resources/icons/min-white.svg">
        </button>
        <button class="barBtn" onclick="maxWindow()">
            <img src="../resources/icons/max-white.svg" id="maxBtn">
        </button>
        <button class="barBtn" onclick="closeWindow()">
            <img src="../resources/icons/x-lg.svg">
        </button>
    </div>
    </div>
`

if(filename == "index.html")
    document.body.insertAdjacentHTML("afterbegin", _TitleBar)
else
    document.body.insertAdjacentHTML("afterbegin", comBar)