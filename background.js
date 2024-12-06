// Evento executado ao clicar no ícone da extensão
chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: "content-script.js"
      })
    }
  })
  