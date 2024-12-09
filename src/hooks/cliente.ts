import { Cliente, ClienteArray, ClienteCreate, ClienteUpdate } from "@/model/cliente";
import api from "@/server/server";
import { useState } from "react";

export const useClienteHook = () => {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [clientes, setClientes] = useState<ClienteArray | null>(null);

    const criarCliente = async (cliente: ClienteCreate): Promise<Cliente> => {
        const response = await api.post("cliente/criar", cliente);
        return response.data;
    };

    const editarCliente = async (cliente: ClienteUpdate): Promise<ClienteUpdate> => {
        const response = await api.put(`cliente/editar/${cliente.numInscricao}`, cliente);
        return response.data;
    };

    const listarClientes = async () => {
        const response = await api.get("cliente/listar");
        if (response.data) {
            setClientes(response.data);
        }
    };

    const selecionarCliente = async (clienteId: string) => {
        const response = await api.get(`cliente/listar/${clienteId}`);
        if (response.data) {
            setCliente(response.data);
        }
    };

    // const desativarCliente = async (clienteId: string): Promise<void> => {
    //     const response = await api.patch(`cliente/desativar/${clienteId}`);
    //     return response.data;
    // };

    // // Função para reativar um cliente
    // const reativarCliente = async (clienteId: string): Promise<void> => {
    //     const response = await api.patch(`cliente/reativar/${clienteId}`);
    //     return response.data;
    // };

    // Função para excluir um cliente
    const excluirCliente = async (clienteId: string): Promise<void> => {
        const response = await api.delete(`cliente/deletar/${clienteId}`);
        return response.data;
    };

    return {
        criarCliente,
        editarCliente,
        listarClientes,
        selecionarCliente,
        // desativarCliente,
        // reativarCliente,
        excluirCliente,
        clientes,
        cliente,
    };
};
