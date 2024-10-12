"use client";

import { DataTableAtor } from "./components/table-ator";
import { useAtorHook } from "@/hooks/ator";
import { FormNovoAtor } from "./novoAtor/components/dialog-form-ator";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Ator() {
  const { atores, listarAtores } = useAtorHook();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listarAtores();
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
