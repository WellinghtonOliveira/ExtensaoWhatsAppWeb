const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const nomeSelect = document.querySelector('#contatosNome')
const listaNomes = []


chrome.runtime.onMessage.addListener((m) => {
    if (m.lNomes) {
        listaNomes.push(...m.lNomes);
    }
    console.log(m.lNomes)
})

const contatosMensagens = () => {
    const nomes = [];
    const listaConversa = document.querySelectorAll('._ak8q');
    const nomesContt = listaConversa.querySelectorAll('span')
    console.log(nomesContt)

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

