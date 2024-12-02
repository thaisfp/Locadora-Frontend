"use client";

import { useLocacaoHook } from "@/hooks/locacao";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovaLocacao } from "./novaLocacao/components/form-locacao";
import { DataTableLocacao } from "./components/table-locacao";

export default function Locacao() {
  const { locacoes, listarLocacoes } = useLocacaoHook();

  useEffect(() => {
    const fetchData = async () => {
      await listarLocacoes();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
