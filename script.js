const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    if (input.value == "") {
        alert("A lista está vazia, por favor, digite uma tarefa para prosseguir")
    } else {
        minhaListaDeItens.push({
            tarefa: input.value,
            concluida: false
        })

        input.value = ''

        mostrarTarefa()
    }
}

function mostrarTarefa() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi +=
            `
            <li class="task ${item.concluida && "done"}">
                <img src="./imagens/checked.png" alt="check-na-tarefa" onclick="tarefaConcluida(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./imagens/edit.png" alt="editar-tarefa" onclick="editarTarefa(${posicao})">
                <img src="./imagens/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            </li>
        `
    })
    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

    input.focus()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefa()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefa()
}

function tarefaConcluida(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefa()
}

function editarTarefa(posicao) {
    const novoNome = prompt("Digite o novo nome da tarefa:")
    if (novoNome !== null) {
        minhaListaDeItens[posicao].tarefa = novoNome
        mostrarTarefa()
    }
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)