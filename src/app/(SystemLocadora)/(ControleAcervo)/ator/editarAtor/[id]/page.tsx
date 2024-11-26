"use client";

import { useAtorHook } from "@/hooks/ator";
import { FormNovoAtor } from "../../novoAtor/components/dialog-form-ator";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface EditarAtorProps {
  params: {
    id: string;
  };
}

export default function EditarAtor({ params }: EditarAtorProps) {
  const {id} = params;
  const { ator, selecionarAtor } = useAtorHook();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await selecionarAtor(id);
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
      <FormNovoAtor ator={ator!}></FormNovoAtor>
    </div>
  );
}
