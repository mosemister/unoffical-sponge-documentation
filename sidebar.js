let isOpen = false;

const onSidebarClick = () => {
    const sidebar = document.getElementById("sidebar")
    const sidebarClasses = sidebar.classList
    isOpen = !isOpen
    if(isOpen){
        sidebarClasses.remove("sidebar-closed")
        sidebarClasses.add("sidebar-open")
    }else{
        sidebarClasses.add("sidebar-closed")
        sidebarClasses.remove("sidebar-open")
    }
}

const insertSidebar = async () => {
    const sidebar = document.getElementById("sidebar")
    const sidebarChild = sidebar.children[0]

    const result = await fetch("/sidebar.html")
    const text = await result.text();
    sidebarChild.innerHTML = text;
    sidebar.classList.add("sidebar-closed")
}

const onSidebarLoad = () => {
    window.onresize = function () {
        adjustBottom();
    }
    insertSidebar()
    adjustBottom()
}

const adjustBottom = () => {
    const headerHeight = document.getElementById("header").clientHeight
    const bottomContentHeight = document.getElementById("bottom").clientHeight
    const main = document.getElementById("main")
    const mainHeight = main.scrollHeight
    const mainCurrentHeight = main.clientHeight
    if(mainCurrentHeight < mainHeight && mainHeight < (window.innerHeight - bottomContentHeight)){
        main.parentElement.style.height = `calc(${window.innerHeight}px - ${headerHeight}px - ${bottomContentHeight}px)`
    }
}
