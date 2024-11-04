import { Ator } from "./ator";
import { Classe } from "./classe";
import { Diretor } from "./diretor";

export interface Titulo {
    id: string;
    nome: string;
    ator: Ator;
    diretor: Diretor;
    ano: number;
    sinopse: string;
    categoria: string;
    classe: Classe;
  }
  
  export interface TituloCreate {
    nome: string;
    ator: {id: string};
    diretor: {id: string};
    ano: number;
    sinopse: string;
    categoria: string;
    classe: {id: string};
  }
  
  export interface TituloUpdate extends TituloCreate{
    id: string;
    
  }
  
  export interface TitulosArray extends Array<Titulo> { }