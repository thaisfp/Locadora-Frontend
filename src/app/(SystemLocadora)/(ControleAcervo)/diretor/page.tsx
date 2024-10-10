"use client";

import { DataTableDiretor } from "./components/table-diretor";
import { FormNovoDiretor } from "./components/dialog-form-diretor";
import { useDiretorHook } from "@/hooks/diretor";

export default function Ator() {

  const {diretores} = useDiretorHook(); 
  return (
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoDiretor></FormNovoDiretor>
          </div>
          <div>
            <DataTableDiretor diretores = {diretores!}></DataTableDiretor>
          </div>
        </div>
      </div>
  )
}
