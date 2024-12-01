import { Cliente, ClienteCreate, ClienteUpdate } from "./cliente";

export type Dependente = Cliente;
 
export type DependenteCreate = ClienteCreate;

export type DependenteUpdate = ClienteUpdate;

export type DependentesArray = Array<Dependente>;