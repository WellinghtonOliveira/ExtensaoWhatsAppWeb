chrome.action.onClicked.addListener((tab) => {
    const phone = prompt("5544984130677");
    const message = prompt("teste");

    if (!phone || !message) {
        alert('Você precisa fornecer um número de telefone e uma mensagem.');
        return;
    }

    // Cria a URL do WhatsApp Web com o número e a mensagem
    const whatsappURL = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    // Abre uma nova aba no WhatsApp Web
    chrome.tabs.create({ url: whatsappURL }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // Espera a página carregar para tentar enviar a mensagem
                setTimeout(() => {
                    const sendButton = document.querySelector('span[data-icon="send"]');
                    if (sendButton) {
                        sendButton.click();
                    } else {
                        alert('Botão de envio não encontrado. Por favor, envie manualmente.');
                    }
                }, 5000);  // Aguarda 5 segundos para a página carregar
            }
        });
    });
});
