"use client";

import { useClasseHook } from "@/hooks/classe";
import { FormNovaClasse } from "../../novaClasse/components/dialog-form-classe";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface EditarClasseProps {
  params:{
    id: string;
  };
}

export default function EditarClasse({ params }: EditarClasseProps) {
  const {id} = params;
  const { classe, selecionarClasse } = useClasseHook();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await selecionarClasse(id);
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
      <FormNovaClasse classe={classe!}></FormNovaClasse>
    </div>
  );
}
