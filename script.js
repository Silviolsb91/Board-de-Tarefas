const addButton = document.getElementById("add-btn")
const inputNomeTarefa = document.getElementById("inputNomeTarefa")
const inputEtiqueta = document.getElementById("inputEtiqueta")
const listaCompleta = document.getElementById("seçaoTarefas")

let listaDeTarefas = []

function AddNovaTarefa (){
    if (inputNomeTarefa.value !== "" && inputEtiqueta.value !== "") {
        listaDeTarefas.push({
            nome: inputNomeTarefa.value,
            etiqueta: inputEtiqueta.value,
            dataCriacao: new Date().toLocaleDateString(),
            concluida: false
        })

        inputNomeTarefa.value = ''
        inputEtiqueta.value = ''

        mostrarTarefas()

    } else {
        alert("Preencha todos os campos!")
    }
}

function mostrarTarefas () {
    let novaTarefa = ''

    listaDeTarefas.forEach((tarefa, posicao) => {
        novaTarefa += `
        <div class="tarefa">
            <div class="descriçao-tarefa">
                <h3 class="${tarefa.concluida ? 'concluida' : ''}">${tarefa.nome}</h3>
                <div class="registro">
                    <p>${tarefa.etiqueta}</p>
                    <p>Criado em: ${tarefa.dataCriacao}</p>
                </div>
            </div>
            <div>
            ${
                tarefa.concluida 
                ? `<img src="./ícones/check.svg" alt="Ícone de check" style="width: 24px; height: 24px;">`
                : `<button class="btn-concluir" onclick="concluirTarefa(${posicao})">Concluir</button>`
            }
            </div>
        </div>
        `;
    });

    listaCompleta.innerHTML = novaTarefa

    localStorage.setItem('lista', JSON.stringify(listaDeTarefas))

    atualizarFooter()
}

function recarregarTarefas () {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage){
    listaDeTarefas = JSON.parse(tarefasDoLocalStorage)
    }
    
    mostrarTarefas()
    atualizarFooter()
}

recarregarTarefas()

function concluirTarefa(posicao) {
    listaDeTarefas[posicao].concluida = true
    mostrarTarefas()
    atualizarFooter()

    setTimeout(() => {
        listaDeTarefas.splice(posicao, 1)
        mostrarTarefas()
        atualizarFooter()
    }, 2000)
}

function atualizarFooter() {
    const contador = document.getElementById("contadorConcluidas")
    const totalConcluidas = listaDeTarefas.filter(tarefa => tarefa.concluida).length
    contador.innerText = `${totalConcluidas} tarefa(s) concluída(s)`
}

addButton.addEventListener('click', AddNovaTarefa)