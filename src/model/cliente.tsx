export interface Cliente {
    id: string;
    nome: string;
    endereco: string;
    telefone: string;
    sexo: 'M' | 'F';
    cpf: string;
    dataNascimento: string; // Formato ISO-8601
    ativo: boolean;
    tipo: 'SOCIO' | 'DEPENDENTE'; // Distinção entre sócio e dependente
}

export interface ClienteCreate {
    nome: string;
    endereco: string;
    telefone: string;
    sexo: 'M' | 'F';
    cpf: string;
    dataNascimento: string;
    tipo: 'SOCIO' | 'DEPENDENTE';
}

export interface ClienteUpdate {
    id: string;
    nome?: string;
    endereco?: string;
    telefone?: string;
    sexo?: 'M' | 'F';
    cpf?: string;
    dataNascimento?: string;
}

export type ClientesArray = Array<Cliente>;