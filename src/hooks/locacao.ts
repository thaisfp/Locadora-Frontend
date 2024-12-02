import {
  Locacao,
  LocacaoCreate,
  LocacaoUpdate,
  LocacoesArray,
} from "@/model/locacao";
import api from "@/server/server";
import { useState } from "react";

export const useLocacaoHook = () => {
  const [locacao, setLocacao] = useState<Locacao | null>(null);
  const [locacoes, setLocacoes] = useState<LocacoesArray | null>(null);

  const criarLocacao = async (locacaoData: LocacaoCreate): Promise<Locacao> => {
    const response = await api.post("locacao/criar", locacaoData);
    return response.data;
  };

  const editarLocacao = async (
    locacaoData: LocacaoUpdate
  ): Promise<Locacao> => {
    const response = await api.put(
      `locacao/editar/${locacaoData.idLocacao}`,
      locacaoData
    );
    return response.data;
  };

  const deletarLocacao = async (locacaoId: string): Promise<void> => {
    await api.delete(`locacao/deletar/${locacaoId}`);
  };

  const listarLocacoes = async (): Promise<void> => {
    const response = await api.get("locacao/listar");
    if (response.data) {
      setLocacoes(response.data);
    }
  };

  const selecionarLocacao = async (locacaoId: string) => {
    const response = await api.get(`locacao/listar/${locacaoId}`);
    if (response.data) {
      setLocacao(response.data);
    }
  };

  const efetuarDevolucao = async (id: string): Promise<Locacao> => {
    const res = await api.post(`locacao/devolucao`, { id });
    return res.data;
  };

  return {
    criarLocacao,
    editarLocacao,
    deletarLocacao,
    listarLocacoes,
    selecionarLocacao,
    efetuarDevolucao,
    locacao,
    locacoes,
  };
};
