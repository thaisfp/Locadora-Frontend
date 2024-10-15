"use client";

import { DataTableClasse } from "./components/table-classe"; 
import { useClasseHook } from "@/hooks/classe"; 
import { FormNovaClasse } from "./novaClasse/components/dialog-form-classe"; 
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Classe() {
  const { classes, listarClasses } = useClasseHook(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listarClasses();
  }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovaClasse></FormNovaClasse> 
          </div>
          <div>
            <DataTableClasse classes={classes!}></DataTableClasse>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
