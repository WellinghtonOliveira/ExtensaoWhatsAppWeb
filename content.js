const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')

const listaNomes = []

function backgroundExtensao() {
    console.log(listaNomes)
}

const contatosMensagens = (msg) => {
    let nomes = []
    listaNomes.push(nomes)

    const listaConversa = document.querySelectorAll('._ak8q')
    
    listaConversa.forEach((lista) => {
        const nomeContatos = lista.querySelector('span')
        nomes.push(nomeContatos.textContent)
    })

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