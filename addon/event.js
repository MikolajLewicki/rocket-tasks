const contextMenuItem = {
    "id": "sendTask",
    "title": "Oznacz jako sprzedaż",
    "contexts": ["all"]
};


const handleClick = async () => {

}
const handleChangeTab = async (e) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const tab = await chrome.tabs.query(queryOptions);
    console.log(tab[0].url)
}
chrome.tabs.onActivated.addListener(handleChangeTab)

chrome.contextMenus.create(contextMenuItem)
chrome.contextMenus.onClicked.addListener(handleClick)
