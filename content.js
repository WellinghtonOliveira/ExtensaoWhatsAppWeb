const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const listasNomes = []

const contatosMensagens = () => {
    const nomes = [];
    const listaConversa = document.querySelectorAll('._ak8q');
    
    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span');
        if (nomeContatos) {
            nomes.push(nomeContatos.textContent);
        }
    });

    localStorage.setItem('meusContatos', JSON.stringify(nomes))
    console.log(nomes)
};

btnContatos.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: contatosMensagens
        }
    );
});