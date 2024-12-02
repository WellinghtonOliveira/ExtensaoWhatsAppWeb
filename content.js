const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const nomeSelect = document.querySelector('#contatosNome')
const listaNomes = []


function addOptionsContato() {
    listaNomes.forEach((nome) => {
        const contato = document.createElement('option')
        contato.textContent = nome
        contato.value = nome
        nomeSelect.appendChild(contato)
    })
}

chrome.runtime.onMessage.addListener((m) => {
    if (m.lNomes) {
        listaNomes.push(...m.lNomes);
    }
    addOptionsContato();
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

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: contatosMensagens
        },
        () => {
            setTimeout(() => {
                console.log('Lista carregada')
            }, 1000)
        }
    );
});

