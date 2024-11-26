"use client";

import { useClienteHook } from "@/hooks/cliente"; 
import { FormNovoCliente } from "./components/dialog-form-cliente"; 
import { useState } from "react";
import { Loader } from "lucide-react";

export default function CadastrarCliente() {
  const { salvarCliente, isLoading } = useClienteHook(); 
  const [erro, setErro] = useState<string | null>(null);

  const handleSave = async (dadosCliente: {
    nome: string;
    endereco: string;
    telefone: string;
    sexo: string;
    cpf: string;
    dataNascimento: string;
  }) => {
    try {
      setErro(null); 
      await salvarCliente(dadosCliente); 
      alert("Cliente cadastrado com sucesso!");
    } catch (error: any) {
      setErro(error.message || "Erro ao salvar o cliente.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 w-full">
        Carregando...
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Cliente</h1>
      {erro && <div className="text-red-500 mb-4">{erro}</div>}
      <FormNovoCliente onSave={handleSave} />
    </div>
  );
}
