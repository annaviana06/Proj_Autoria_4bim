export class Categoria {
  constructor(nome, faixaetaria) {
      this._nome = nome;
      this._faixaetaria = faixaetaria;
      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set nome(nome){
    this._nome = nome;
  }

  set faixaetaria (faixaetaria){
    this._faixaetaria = faixaetaria;
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

  get descricao(){
    return this._faixaetaria;
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