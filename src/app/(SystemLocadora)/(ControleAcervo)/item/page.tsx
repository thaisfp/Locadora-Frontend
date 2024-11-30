"use client";

import { useItemHook } from "@/hooks/item";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovoItem } from "./novoItem/components/dialog-form-item";
import { DataTableItem } from "./components/table-item";

export default function Item() {
  const { itens, listarItens } = useItemHook();

  useEffect(() => {
    const fetchData = async () => {
      await listarItens();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
