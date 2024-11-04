"use client";

import { useTituloHook } from "@/hooks/titulo"; 
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoTitulo } from "../novoTitulo/components/dialog-form-titulo";

interface EditarTituloProps {
  id: string;
}

export default function EditarTitulo({ id }: EditarTituloProps) {
  const { titulo, selecionarTitulo } = useTituloHook(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await selecionarTitulo(id); 
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 w-full">
        Carregando...
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Projeto : Locadora de Vídeo Passatempo</h1>
      <h2 className="text-xl">Sub-Sistema : Controle de Acervo</h2>
      <p className="italic">Nome do Caso de Uso: Cadastrar Título</p>
      <p>Analista :</p>
      <p>Data : 01/12/2004</p>
      <p className="mt-4">Descrição : Este caso de uso é responsável pelo controle de títulos, abrangendo a inclusão de um novo título, alteração, consulta e exclusão de títulos existentes.</p>
      
      <FormNovoTitulo titulo={titulo!}></FormNovoTitulo>
    </div>
  );
}