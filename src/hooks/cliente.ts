import { Cliente, ClienteCreate, ClientesArray, ClienteUpdate } from "@/model/cliente";
import api from "@/server/server";
import { useState } from "react";

export const useClienteHook = () => {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [clientes, setClientes] = useState<ClientesArray | null>(null);

    // Função para criar um novo cliente (sócio ou dependente)
    const criarCliente = async (cliente: ClienteCreate): Promise<Cliente> => {
        const response = await api.post("cliente/criar", cliente);
        return response.data;
    };

    // Função para editar os dados de um cliente existente
    const editarCliente = async (cliente: ClienteUpdate): Promise<ClienteUpdate> => {
        const response = await api.put(`cliente/editar/${cliente.id}`, cliente);
        return response.data;
    };

    // Função para listar todos os clientes
    const listarClientes = async () => {
        const response = await api.get("cliente/listar");
        if (response.data) {
            setClientes(response.data);
        }
    };

    // Função para buscar informações de um cliente específico
    const selecionarCliente = async (clienteId: string) => {
        const response = await api.get(`cliente/listar/${clienteId}`);
        if (response.data) {
            setCliente(response.data);
        }
    };

    // Função para desativar um cliente
    const desativarCliente = async (clienteId: string): Promise<void> => {
        const response = await api.patch(`cliente/desativar/${clienteId}`);
        return response.data;
    };

    // Função para reativar um cliente
    const reativarCliente = async (clienteId: string): Promise<void> => {
        const response = await api.patch(`cliente/reativar/${clienteId}`);
        return response.data;
    };

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
        desativarCliente,
        reativarCliente,
        excluirCliente,
        clientes,
        cliente,
    };
};
