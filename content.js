let contato = "Mae";  // Substitua pelo nome do contato ou grupo
let mensagem = "Olá, isso é uma mensagem automática";  // Substitua pela mensagem que você quer enviar

// Procura pelo contato no WhatsApp
let chat = Array.from(document.querySelectorAll("span[title]")).find(el => el.title === contato);
if (chat) {
    chat.click();  // Clica no contato para abrir a janela de chat

    // Aguarda um momento para garantir que a janela de chat abriu
    setTimeout(() => {
        // Seleciona a caixa de texto do chat
        let messageBox = document.querySelector("div[contenteditable='true']");
        if (messageBox) {
            messageBox.textContent = mensagem;  // Insere a mensagem

            // Cria um evento de entrada (input) para simular a digitação da mensagem
            let inputEvent = new InputEvent('input', {
                bubbles: true,
                cancelable: true,
            });
            messageBox.dispatchEvent(inputEvent);  // Dispara o evento

            // Envia a mensagem
            document.querySelector("span[data-icon='send']").click();
        }
    }, 1000);  // Aguarda 1 segundo para garantir que o chat carregue corretamente
} else {
    console.log("Contato ou grupo não encontrado.");
}
