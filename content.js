const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const listasNomes = []


chrome.runtime.onMessage.addListener((nom) => {
    listasNomes = nom.lista
})

const contatosMensagens = (msg) => {
    let nomes = []

    const listaConversa = document.querySelectorAll('._ak8q')
    
    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span')
        nomes.push(nomeContatos.textContent)
    })

    chrome.runtime.sendMessage({lista: nomes})
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: contatosMensagens,
        args: [mensagem.value]
    })

})