"use client";

import { DataTableAtor } from "./components/table-ator";
import { useAtorHook } from "@/hooks/ator";
import { FormNovoAtor } from "./novoAtor/components/dialog-form-ator";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Ator() {
  const { atores, listarAtores } = useAtorHook();

  useEffect(() => {
    const fetchData = async () => {
      await listarAtores();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoAtor></FormNovoAtor>
          </div>
          <div>
            <DataTableAtor atores={atores!}></DataTableAtor>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
