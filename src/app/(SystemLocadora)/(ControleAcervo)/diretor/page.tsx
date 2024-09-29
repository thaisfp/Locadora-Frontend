"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTableDiretor } from "./components/table-diretor";
import { FormNovoDiretor } from "./components/form-diretor";

export default function Ator() {
  const [mostrarForm, setMostrarForm] = useState(false);

  const habilitarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  return (
    <div className="w-full h-screen p-10 ">
      {mostrarForm ? (
        <div className="flex h-full flex-row">
          <div className="w-1/2  p-10 border">
            <div className="flex justify-end">
              <Button
                className="bg-slate-400 shadow-md w-1/3 text-lg hover:bg-sky-700 "
                onClick={habilitarFormulario}
              >
                {mostrarForm ? 'Cancelar' : 'Novo Ator'}
              </Button>
            </div>
            <div>
              <DataTableDiretor/>
            </div>
          </div>
          <div className="w-1/2">
            <FormNovoDiretor></FormNovoDiretor>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <Button
              className="bg-slate-400 shadow-md w-1/5 text-lg hover:bg-sky-700 "
              onClick={habilitarFormulario}
            >
              Novo Diretor
            </Button>
          </div>
          <div>
            <DataTableDiretor></DataTableDiretor>
          </div>
        </div>
      )}
    </div>
  );
}
