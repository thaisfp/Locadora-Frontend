"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDependenteHook } from "@/hooks/dependente";
import { FormNovoCliente } from "./novoCliente/components/dialog-form-cliente";
import { useSocioHook } from "@/hooks/socio";
import { DataTableSocios } from "./components/socio/table-socio";
import { DataTableCliente } from "./components/cliente/table-cliente";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function Titulo() {
  const { dependentes, listarDependentes } = useDependenteHook();
  const { socios, listarSocios } = useSocioHook();

  useEffect(() => {
    const fetchData = async () => {
      await listarDependentes();
      await listarSocios();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoCliente />
          </div>
          <div>
            <DataTableCliente dependentes={dependentes!} socios={socios!} />
            <Separator></Separator>
            <h3 className="text-2xl pt-5">Listagem de Sócios</h3>
            <DataTableSocios socios={socios!} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
