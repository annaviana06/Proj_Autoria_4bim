import localView from "../view/LocalView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarTarefaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = localView.renderizarFormulario();
  document.getElementById("formulario_local").addEventListener("submit", cadastrarTarefa);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTarefa(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("local_titulo_formulario").value;
  const descricaoValor = document.getElementById("local_descricao_formulario").value;
  const novaTarefa = { nome: tituloValor, capacidade: descricaoValor };

  try {
    await fetch(`${API_BASE_URL}/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar local:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaTarefas(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/local");
    const localBD = await response.json(); 

    const local = localBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        capacidade: row.capacidade,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = localView.renderizarTabela(local);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar local:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const localId = this.getAttribute("local-id");
      excluirTarefa(localId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const localId = this.getAttribute("local-atualizar-id");
      buscarTarefa(localId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/local/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o local");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o local:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/local/${id}`);
    const localBD = await response.json();
    if (localBD.length <= 0) return;

    const local = localBD.map(row => ({
      id: row.id,
      nome: row.nome,
      capacidade: row.capacidade,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = localView.renderizarFormularioAtualizar(local);
    document.getElementById("formulario_tarefa_atualizar").addEventListener("submit", atualizarTarefa);
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarTarefa(event) {
  event.preventDefault();

  const idValor = document.getElementById("local_id_formulario").value;
  const tituloValor = document.getElementById("local_titulo_formulario").value;
  const descricaoValor = document.getElementById("local_descricao_formulario").value;
  const local = {id: idValor, nome: tituloValor, capacidade: descricaoValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/local`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(local),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a local");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar local:", error);
  }
}

const TarefaController = {
  renderizarTarefaFormulario,
  cadastrarTarefa,
  renderizarListaTarefas,
  excluirTarefa,
};

export default TarefaController;
