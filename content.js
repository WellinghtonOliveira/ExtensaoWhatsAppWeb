const mensagem = document.querySelector('.texto')
const form = document.querySelector('form')
const btnContatos = document.querySelector('.contatos')
const listasNomes = []


chrome.runtime.onMessage.addListener((nom) => {
    console.log(nom.lista)
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

    return nomes; // Retorna os nomes coletados
};

btnContatos.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: contatosMensagens,
        },
        (results) => {
            if (chrome.runtime.lastError) {
                console.error('Erro ao executar o script:', chrome.runtime.lastError.message);
                return;
            }

            // Captura os resultados do script injetado
            const nomes = results[0]?.result || [];
            console.log('Nomes coletados:', nomes);

            // Você pode agora armazenar, exibir ou usar esses nomes
            listasNomes.push(...nomes);
        }
    );
});