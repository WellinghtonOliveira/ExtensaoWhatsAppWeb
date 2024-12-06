const mensagem = document.querySelector('.texto');
const form = document.querySelector('form');
const btnContatos = document.querySelector('.contatos');
const nomeSelect = document.querySelector('#contatosNome');

let lista = []

function clickBtnContatos() {
    console.log(lista);

}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    lista.push(message.lNomes)
    return true; // Para manter o canal aberto (não obrigatório nesse caso).
});

const contatosMensagens = () => {
    const nomes = [];
    const listaConversa = document.querySelectorAll('._ak8q');

    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span');
        if (nomeContatos) {
            nomes.push(nomeContatos.textContent);
        }
    });

    // Envia a lista de nomes de volta ao script de fundo
    chrome.runtime.sendMessage({ lNomes: nomes });
};

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

    clickBtnContatos()
});
