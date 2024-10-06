export interface Classe{
    id: string;
    nome: string;
    dataDevolucao: Date;
    classe: string;
}

export interface ClasseCreate{
    nome: string;
    dataDevolucao: Date;
    classe: string;
}

export interface ClasseUpdate{
    id: string;
}

export type ClassesArray = Array<Classe>