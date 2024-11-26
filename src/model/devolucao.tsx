import { Item } from "./item";
import { Locacao } from "./locacao";

export interface Devolucao {
  id: string;                 
  item: Item;                 
  locacao: Locacao;           
  dataDevolucaoEfetiva: Date; 
  multa?: number;             
  valorTotal: number;         
  status: "pendente" | "concluida";
}

export interface DevolucaoCreate {
  item: { id: string };         
  locacao: { id: string };      
  dataDevolucaoEfetiva: Date;   
}

export interface DevolucaoUpdate extends DevolucaoCreate {
  id: string;                   
  multa?: number;               
  valorTotal: number;           
  status?: "pendente" | "concluida"; 
}

export type DevolucoesArray = Array<Devolucao>;
