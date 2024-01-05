/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_categoria">
              <div class="form-group">
                  <label for="categoria_titulo">Nome da Categoria:</label>
                  <input type="text" class="form-control" id="categoria_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="categoria_descricao">Faixa Etária:</label>
                  <textarea class="form-control" id="categoria_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} categoria - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(categoria) {
    return `
            <form class="mt-3" id="formulario_categoria_atualizar">
                <input type="hidden" class="form-control" id="categoria_id_formulario" value="${categoria.id}">
                <div class="form-group">
                    <label for="categoria_titulo">Nome da Categoria:</label>
                    <input type="text" class="form-control" id="categoria_titulo_formulario" value="${categoria.nome}">
                </div>
                <div class="form-group">
                    <label for="categoria_descricao">Faixa Etária:</label>
                    <textarea class="form-control" id="categoria_descricao_formulario">${categoria.faixaetaria}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} categorias\ - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(categorias) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Nome da categoria</th>
                      <th>Faixa Etária</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  categorias.forEach((categoria) => {
    tabela += `
              <tr>
                  <td>${categoria.id}</td>
                  <td>${categoria.nome}</td>
                  <td>${categoria.faixaetaria}</td>
                  <td>
                    <button class="excluir-btn" categoria-id=${categoria.id}>Excluir</button>
                    <button class="atualizar-btn" categoria-atualizar-id=${categoria.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const CategoriaView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default CategoriaView;
