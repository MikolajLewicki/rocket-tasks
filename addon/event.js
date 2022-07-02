const Options = {
    domain: 'stackoverflow.com',
}

const contextMenuItem = {
    "id": "sendTask",
    "title": "Oznacz jako sprzedaż",
    "contexts": ["all"]
};

let link = "";

///Showing Context Menu only when site url === Options domain
const handleChangeTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const tab = await chrome.tabs.query(queryOptions);
    link = tab[0].url.slice(8, Options.domain.length+8)
    link === Options.domain ? chrome.contextMenus.create(contextMenuItem) : chrome.contextMenus.removeAll()
}
chrome.tabs.onActivated.addListener(handleChangeTab)

///handling Context Menu action

const handleClick = async () => {
    console.log('it works')
}

chrome.contextMenus.onClicked.addListener(handleClick)
