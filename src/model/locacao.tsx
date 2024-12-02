import { Item } from "./item";
import { Dependente } from "./dependente";

export interface Locacao {
  idLocacao: string; 
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number; 
  cliente: Dependente; 
  item: Item;
  status: 'pendente' | 'concluido';
}

export interface LocacaoCreate {
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  valorCobrado: number;
  cliente: {id: string}; 
  item: {id: string};     
  status: 'pendente' | 'concluido';   
}

export interface LocacaoUpdate extends LocacaoCreate{
  idLocacao: string;     
}

export type LocacoesArray = Array<Locacao>;
