import { Devolucao, DevolucaoCreate, DevolucaoUpdate, DevolucoesArray } from "@/model/devolucao";
import api from "@/server/server";
import { useState } from "react";

export const useDevolucaoHook = () => {
    const [devolucao, setDevolucao] = useState<Devolucao | null>(null);
    const [devolucoes, setDevolucoes] = useState<DevolucoesArray | null>(null);

    const efetuarDevolucao = async (devolucaoData: DevolucaoCreate): Promise<Devolucao> => {
        const response = await api.post('devolucao/efetuar', devolucaoData);
        return response.data;
    };

    const listarDevolucoes = async (): Promise<void> => {
        const response = await api.get('devolucao/listar');
        if (response.data) {
            setDevolucoes(response.data);
        }
    };

    const selecionarDevolucao = async (devolucaoId: string) => {
        const response = await api.get(`devolucao/listar/${devolucaoId}`);
        if (response.data) {
            setDevolucao(response.data);
        }
    };

    return {
        efetuarDevolucao,
        listarDevolucoes,
        selecionarDevolucao,
        devolucao,
        devolucoes,
    };
};
