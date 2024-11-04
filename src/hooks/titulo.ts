import { Titulo, TituloCreate, TituloUpdate, TitulosArray } from "@/model/titulo";
import { AtoresArray} from "@/model/ator";
import { DiretoresArray} from "@/model/diretor";
import { ClassesArray} from "@/model/classe";
import api from "@/server/server";
import { useState } from "react";

export const useTituloHook = () => {
    const [titulo, setTitulo] = useState<Titulo | null>(null);
    const [titulos, setTitulos] = useState<TitulosArray | null>(null);
    const [atores, setAtores] = useState<AtoresArray | null>(null); 
    const [diretores, setDiretores] = useState<DiretoresArray | null>(null); 
    const [classes, setClasses] = useState<ClassesArray | null>(null); 

    const criarTitulo = async (tituloData: TituloCreate): Promise<Titulo> => {
        const response = await api.post('titulo/criar', tituloData);
        return response.data;
    };

    const editarTitulo = async (tituloData: TituloUpdate): Promise<TituloUpdate> => {
        const response = await api.put(`titulo/editar/${tituloData.id}`, tituloData);
        return response.data;
    }

    const deletarTitulo = async (tituloId: string): Promise<void> => {
        const response = await api.delete(`titulo/deletar/${tituloId}`);
        return response.data;
    }

    const listarTitulos = async () => {
        const response = await api.get('titulo/listar');
        if (response.data) {
            setTitulos(response.data);
        }
    }

    const selecionarTitulo = async (tituloId: string) => {
        const response = await api.get(`titulo/listar/${tituloId}`);
        if (response.data) {
            setTitulo(response.data);
        }
    }


    const listarAtores = async () => {
        const response = await api.get('ator/listar'); 
        if (response.data) {
            setAtores(response.data);
        }
    };

    const listarDiretores = async () => {
        const response = await api.get('diretor/listar'); 
        if (response.data) {
            setDiretores(response.data);
        }
    };

    const listarClasses = async () => {
        const response = await api.get('classe/listar'); 
        if (response.data) {
            setClasses(response.data);
        }
    };

    return {
        criarTitulo,
        editarTitulo,
        deletarTitulo,
        listarTitulos,
        selecionarTitulo,
        titulos,
        titulo,
        listarAtores,
        listarDiretores,
        listarClasses,
        atores,
        diretores,
        classes,
    };
};