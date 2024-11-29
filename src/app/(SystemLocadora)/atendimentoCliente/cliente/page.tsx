"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTableCliente } from "./novoCliente/components/table-cliente";
import { useDependenteHook } from "@/hooks/dependente";
import { FormNovoCliente } from "./novoCliente/components/dialog-form-cliente";

export default function Titulo() {
  const { dependentes, listarDependentes } = useDependenteHook();

  useEffect(() => {
    const fetchData = async () => {
      await listarDependentes();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("TITULOS === ", dependentes)
  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoCliente />
          </div>
          <div>
            <DataTableCliente dependentes={dependentes!} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
