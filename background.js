// Escuta mensagens enviadas pelo content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CONTATOS") {
        console.log("Contatos recebidos do content script:", message.lNomes);

        // Reenvia a mensagem para todos os content scripts ativos
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { lNomes: message.lNomes });
            });
        });
    }
});
