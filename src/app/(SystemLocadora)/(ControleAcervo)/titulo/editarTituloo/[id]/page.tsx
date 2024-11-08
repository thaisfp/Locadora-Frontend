"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoTitulo } from "../../novoTitulo/components/dialog-form-titulo";
import { Titulo } from "@/model/titulo";

interface EditarTituloProps {
    tituloObj: Titulo;
  }
  
  export default function EditarTitulo({ tituloObj }: EditarTituloProps) {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        setIsLoading(false);
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tituloObj.idTitulo]);
  
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
        <FormNovoTitulo titulo={tituloObj!}></FormNovoTitulo>
      </div>
    );
  }
