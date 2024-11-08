"use client";

import { useTituloHook } from "@/hooks/titulo";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoTitulo } from "../../novoTitulo/components/dialog-form-titulo";

interface EditarTituloProps {
    id: string;
  }
  
  export default function EditarClasse({ id }: EditarTituloProps) {
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
        <FormNovoTitulo titulo={titulo!}></FormNovoTitulo>
      </div>
    );
  }
