"use client";

import { DataTableDiretor } from "./components/table-diretor"; 
import { useDiretorHook } from "@/hooks/diretor"; 
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovoDiretor } from "./novoDiretor/components/dialog-form-diretor";

export default function Diretor() {
  const { diretores, listarDiretores } = useDiretorHook(); 

  useEffect(() => {
    const fetchData = async () => {
      await listarDiretores();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
          <FormNovoDiretor></FormNovoDiretor>
          </div>
          <div>
            <DataTableDiretor diretores={diretores!}></DataTableDiretor>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}