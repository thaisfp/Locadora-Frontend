"use client";

import { useItemHook } from "@/hooks/item";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovoItem } from "./novoItem/components/dialog-form-item";
import { DataTableItem } from "./components/table-item";

export default function Item() {
  const { itens, listarItens } = useItemHook();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    listarItens();
  }, []);

  console.log("ITENS === ", itens)
  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoItem />
          </div>
          <div>
            <DataTableItem itens={itens!} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
