const mensagem = document.querySelector('.texto');
const form = document.querySelector('form');
const btnContatos = document.querySelector('.contatos');
const nomeSelect = document.querySelector('#contatosNome');

let lista = []



btnContatos.addEventListener('click', () => {
    // Consulta as abas ativas corretamente usando uma Promise
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0]; // Obtém a aba ativa

        // Injeta o script na aba ativa
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: contatosMensagens
        });
    });

});
