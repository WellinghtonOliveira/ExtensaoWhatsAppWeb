document.getElementById('sendBtn').addEventListener('click', () => {
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!phone || !message) {
        alert('Por favor, preencha o número e a mensagem.');
        return;
    }

    // Formatar o número de telefone (sem espaços, traços ou parênteses)
    const formattedPhone = phone.replace(/\D/g, '');

    // Cria a URL do WhatsApp Web com o número e a mensagem
    const whatsappURL = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;

    // Abre a URL do WhatsApp Web em uma nova aba
    chrome.tabs.create({ url: whatsappURL }, (tab) => {
        // Tenta clicar no botão de envio automaticamente
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                setTimeout(() => {
                    const sendButton = document.querySelector('span[data-icon="send"]');
                    if (sendButton) {
                        sendButton.click();
                    } else {
                        alert('Botão de envio não encontrado. Por favor, envie manualmente.');
                    }
                }, 1000);  // Ajuste o tempo se necessário
            }
        });
    });
});
