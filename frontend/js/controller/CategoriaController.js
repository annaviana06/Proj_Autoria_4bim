import categoriaView from "../view/CategoriaView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarTarefaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = categoriaView.renderizarFormulario();
  document.getElementById("formulario_categoria").addEventListener("submit", cadastrarTarefa);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTarefa(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("categoria_titulo_formulario").value;
  const descricaoValor = document.getElementById("categoria_descricao_formulario").value;
  const novaTarefa = { nome: tituloValor, faixaetaria: descricaoValor };

  try {
    await fetch(`${API_BASE_URL}/categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaTarefas(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/categoria");
    const categoriaBD = await response.json(); 

    const categoria = categoriaBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        faixaetaria: row.faixaetaria,
      };
    });
    componentePrincipal.innerHTML = categoriaView.renderizarTabela(categoria);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
      console.error("Erro ao buscar categoria:", error);
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
      const categoriaId = this.getAttribute("categoria-id");
      excluirTarefa(categoriaId);
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
      const categoriaId = this.getAttribute("categoria-atualizar-id");
      buscarTarefa(categoriaId);
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
    const response = await fetch(`${API_BASE_URL}/categoria/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a tarefa");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a categoria:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categoria/${id}`);
    const categoriaBD = await response.json();
    if (categoriaBD.length <= 0) return;

    const categoria = categoriaBD.map(row => ({
      id: row.id,
      nome: row.nome,
      faixaetaria: row.faixaetaria,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = categoriaView.renderizarFormularioAtualizar(categoria);
    document.getElementById("formulario_categoria_atualizar").addEventListener("submit", atualizarTarefa);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarTarefa(event) {
  event.preventDefault();

  const idValor = document.getElementById("categoria_id_formulario").value;
  const tituloValor = document.getElementById("categoria_titulo_formulario").value;
  const descricaoValor = document.getElementById("categoria_descricao_formulario").value;
  const categoria = {id: idValor, nome: tituloValor, faixaetaria: descricaoValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/categoria`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(categoria),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a categoria");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
  }
}

const CategoriaController = {
  renderizarTarefaFormulario,
  cadastrarTarefa,
  renderizarListaTarefas,
  excluirTarefa,
  atualizarTarefa,
};

export default CategoriaController;
