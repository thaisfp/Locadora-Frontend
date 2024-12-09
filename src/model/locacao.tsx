import { Item } from "./item";
import { Cliente } from "./cliente";

export interface Locacao {
  idLocacao: string; 
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number; 
  cliente: Cliente; 
  item: Item;
  // status: 'pendente' | 'concluido';
}

export interface LocacaoCreate {
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number;
  cliente: {numInscricao: number}; 
  item: {id: string};     
  // status: 'pendente' | 'concluido';   
}

export interface LocacaoUpdate extends LocacaoCreate{
  idLocacao: string;     
}

export type LocacoesArray = Array<Locacao>;
