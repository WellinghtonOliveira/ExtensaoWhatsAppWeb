const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const nomeSelect = document.querySelector('#contatosNome')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.lNomes)
    return true
})

const contatosMensagens = () => {
    const nomes = [];
    const listaConversa = document.querySelectorAll('._ak8q');

    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span');
        if (nomeContatos) {
            nomes.push(nomeContatos.textContent);
        }
    });

    chrome.runtime.sendMessage({ lNomes: nomes })
};


btnContatos.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: contatosMensagens
    }).then(() => {
        console.log("Script executado com sucesso!")
    }).catch((error) => {
        console.error("Erro ao executar script:", error)
    })
    console.log('teste')

});

