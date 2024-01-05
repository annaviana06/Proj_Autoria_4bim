export class Local {
  constructor(nome, capacidade) {
      this._nome = nome;
      this._capacidade = capacidade;
      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set nome(nome){
    this._nome = nome;
  }

  set capacidade (capacidade){
    this._capacidade = capacidade ;
  }

  set isCompleta (isCompleta){
    this._isCompleta = isCompleta ;
  }

  set dataAbertura (dataAbertura){
    this._dataAbertura = dataAbertura ;
  }

  set dataPrevistaFinalizacao (_dataPrevistaFinalizacao){
    this._dataPrevistaFinalizacao = dataPrevistaFinalizacao ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get nome(){
    return this._nome;
  }

  get capacidade(){
    return this._capacidade;
  }  

  get isCompleta(){
    return this._isCompleta;
  }    

  get dataAbertura(){
    return this._dataAbertura;
  }   

  get dataPrevistaFinalizacao(){
    return this._dataPrevistaFinalizacao;
  }    

  get usuario(){
    return this._usuario;
  }   

}