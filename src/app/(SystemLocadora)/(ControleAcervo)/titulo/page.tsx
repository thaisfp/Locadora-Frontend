"use client";

import { useTituloHook } from "@/hooks/titulo";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovoTitulo } from "./novoTitulo/components/dialog-form-titulo";
import { DataTableTitulo } from "./components/table-titulo";

export default function Titulo() {
  const { titulos, listarTitulos } = useTituloHook();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    listarTitulos();
  }, []);

  console.log("TITULOS === ", titulos)
  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoTitulo />
          </div>
          <div>
            <DataTableTitulo titulos={titulos!} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
