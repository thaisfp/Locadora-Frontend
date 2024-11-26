import { Item } from "./item";
import { Cliente } from "./cliente";

export interface Locacao {
  id: string; 
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number; 
  cliente: Cliente; 
  item: Item;
}

export interface LocacaoCreate {
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number; 
  cliente: {id: string}; 
  item: {id: string};        
}

export interface LocacaoUpdate extends LocacaoCreate {
  id: string;     
}

export type LocacoesArray = Array<Locacao>;
