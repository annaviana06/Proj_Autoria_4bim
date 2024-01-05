/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_local">
              <div class="form-group">
                  <label for="local_titulo">Nome do Local:</label>
                  <input type="text" class="form-control" id="local_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="local_descricao">Capacidade Máx.:</label>
                  <textarea class="form-control" id="local_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} local - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(local) {
    return `
            <form class="mt-3" id="formulario_local_atualizar">
                <input type="hidden" class="form-control" id="local_id_formulario" value="${local.id}">
                <div class="form-group">
                    <label for="local_titulo">Nome do Local:</label>
                    <input type="text" class="form-control" id="local_titulo_formulario" value="${local.nome}">
                </div>
                <div class="form-group">
                    <label for="local_descricao">Capacidade Máx.:</label>
                    <textarea class="form-control" id="local_descricao_formulario">${local.capacidade}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} locais - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(locais) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome do local</th>
                      <th>Capacidade Máx.</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  locais.forEach((local) => {
    tabela += `
              <tr>
                  <td>${local.id}</td>
                  <td>${local.nome}</td>
                  <td>${local.capacidade}</td>
                  <td>
                    <button class="excluir-btn" local-id=${local.id}>Excluir</button>
                    <button class="atualizar-btn" local-atualizar-id=${local.id}>Atualizar</button>
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

const LocalView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default LocalView;
