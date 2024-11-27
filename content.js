const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')

const contatosMensagens = (msg) => {
    let nomes = []

    const listaConversa = document.querySelectorAll('._ak8q')
    
    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span')
        nomes.push(nomeContatos.textContent)
    })

    console.log(nomesPosition)
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