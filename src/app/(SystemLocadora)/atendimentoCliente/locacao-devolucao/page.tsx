"use client";

import { useLocacaoHook } from "@/hooks/locacao";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovaLocacao } from "./novaLocacao/components/form-locacao";
import { DataTableLocacao } from "./components/table-locacao";

export default function Locacao() {
  const { locacoes, listarLocacoes } = useLocacaoHook();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    listarLocacoes();
  }, []);

  console.log("LOCACOES === ", locacoes)
  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
          <FormNovaLocacao></FormNovaLocacao>
          </div>
          <div>
          <DataTableLocacao locacoes={locacoes!}></DataTableLocacao>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
