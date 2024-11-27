export interface Cliente {
  id: string;
  numInscricao: number;
  nome: string;
  dtNascimento: Date;
  sexo: string;
  estahAtivo: boolean;
}

export interface ClienteCreate {
  numInscricao: number;
  nome: string;
  dtNascimento: Date;
  sexo: string;
  estahAtivo: boolean;
}

export interface ClienteUpdate extends ClienteCreate {
  numInscricao: number;
}

export type ClienteArray = Array<Cliente>;
