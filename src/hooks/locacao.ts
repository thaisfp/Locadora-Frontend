import {
  Locacao,
  LocacaoCreate,
  LocacaoUpdate,
  LocacoesArray,
} from "@/model/locacao";
import api from "@/server/server";
import { AxiosError } from "axios";
import { useState } from "react";

export const useLocacaoHook = () => {
  const [locacao, setLocacao] = useState<Locacao | null>(null);
  const [locacoes, setLocacoes] = useState<LocacoesArray | null>(null);

  const criarLocacao = async (locacaoData: LocacaoCreate): Promise<Locacao> => {
    try {
      const response = await api.post("locacao/criar", locacaoData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const erroMensagem =
          error.response?.data?.message || "Erro desconhecido";
        alert(`${erroMensagem}`);
      } else {
        alert("Erro desconhecido. Tente novamente mais tarde.");
      }
      throw error;
    }
  };

  const editarLocacao = async (
    locacaoData: LocacaoUpdate
  ): Promise<Locacao> => {
    console.log("locacaoData", locacaoData);
    const response = await api.put(
      `locacao/editar`, locacaoData
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
