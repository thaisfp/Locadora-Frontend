import { Cliente, ClienteCreate } from "./cliente";

export type Dependente = Cliente;
 
export type DependenteCreate = ClienteCreate;

export type DependenteUpdate = DependenteCreate;

export type DependenteArray = Array<Dependente>;