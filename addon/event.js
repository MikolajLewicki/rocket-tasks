const Options = {
    domain: 'stackoverflow.com',
}

const contextMenuItem = {
    "id": "sendTask",
    "title": "Oznacz jako sprzedaż",
    "contexts": ["all"]
};

let currentDomain = "";
let currentLink = ""
let currentTabId = ""

///Showing Context Menu only when site url === Options domain
const handleChangeTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const tab = await chrome.tabs.query(queryOptions);
    currentLink = tab[0].url
    currentTabId = tab[0].id
    currentDomain = currentLink.slice(8, Options.domain.length+8)
    currentDomain === Options.domain ? chrome.contextMenus.create(contextMenuItem) : chrome.contextMenus.removeAll()
}
chrome.tabs.onActivated.addListener(handleChangeTab)

///handling Context Menu action

const handleClick = () => {
    chrome.scripting.executeScript({
        target: { tabId: currentTabId },
        function: () => { 
            const url = "http://localhost:5000/tasks/addTask"
            let title =  document.getElementById('question-header').children[0].children[0].text;
            let link = window.location.href
            fetch(url, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify({title, link})})
        }
      });
   
    chrome.contextMenus.removeAll()
}

chrome.contextMenus.onClicked.addListener(handleClick)
