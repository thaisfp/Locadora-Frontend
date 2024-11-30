import { Cliente, ClienteCreate } from "./cliente";
import { Dependente } from "./dependente";

export interface Socio extends Cliente {
  cpf: string;
  endereco: string;
  tel: string;
  dependentes: Array<Dependente>;
}

export interface SocioCreate extends ClienteCreate {
  cpf: string;
  endereco: string;
  tel: string;
  dependentes: Array<Dependente>;
}

export type SocioUpdate = SocioCreate;

export type SocioArray = Array<Socio>;