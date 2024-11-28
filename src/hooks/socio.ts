import { Socio, SocioCreate, SocioArray, SocioUpdate } from "@/model/socio";
import api from "@/server/server";
import { useState } from "react";

export const useSocioHook = () => {
    const [socio, setSocio] = useState<Socio | null>(null);
    const [socios, setSocios] = useState<SocioArray | null>(null);

    const criarSocio = async (socio: SocioCreate): Promise<Socio> => {
        const response = await api.post('socio/criar', socio);
        return response.data;
    };

    const editarSocio = async ( socio: SocioUpdate): Promise<SocioUpdate> => {
        const response = await api.put(`socio/editar`, socio);
        return response.data;
    }

    const deletarSocio = async (socioId: number): Promise<void> => {
        const response = await api.delete(`socio/deletar/${socioId}`);
        return response.data;
    }

    const listarSocios = async () => {
        const response = await api.get(`socio/listar`);
        if (response.data) {
            setSocios(response.data);
        }
    }

    const selecionarSocio = async (socioId: number) => {
        const response = await api.get(`socio/listar/${socioId}`);
        if (response.data) {
            setSocio(response.data);
        }
    }

    const ativarSocio = async (socio: SocioUpdate): Promise<void> => {
        const response = await api.put(`socio/ativar`, socio);
        return response.data;
    }

    const desativarSocio = async (socio: SocioUpdate): Promise<void> => {
        const response = await api.put(`socio/desativar`, socio);
        return response.data;
    }

    return {criarSocio, deletarSocio, editarSocio, listarSocios, selecionarSocio, ativarSocio, desativarSocio, socios, socio}
}