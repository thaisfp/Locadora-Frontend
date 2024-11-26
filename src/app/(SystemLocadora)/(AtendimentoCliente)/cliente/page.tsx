"use client";

import { DataTableAtor } from "./components/table-cliente";
import { useAtorHook } from "@/hooks/cliente";
import { FormNovoAtor } from "./novoAtor/components/dialog-form-cliente";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Cliente() {
  const { clientes, listarClientes } = useClienteHook();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listarClientes();
  }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoCliente></FormNovoCliente>
          </div>
          <div>
            <DataTableAtor clientes={clientes!}></DataTableAtor>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
