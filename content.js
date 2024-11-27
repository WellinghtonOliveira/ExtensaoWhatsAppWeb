const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const listaNomes = []

chrome.runtime.onMessage.addListener((m) => {
    listaNomes.push(...m.lNomes)
    console.log(listaNomes)
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
    chrome.runtime.sendMessage({lNomes: nomes})
};


btnContatos.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: contatosMensagens
        },
        () => {
            setTimeout(() => {
                console.log('Lista carregada')
            },1000)
        }
    );
});

