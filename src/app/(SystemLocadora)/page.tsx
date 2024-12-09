"use client";

import { useTituloHook } from "@/hooks/titulo";
import { DataTableTituloConsulta } from "./components/table-consulta";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    titulos,
    buscarPorAtor,
    buscarPorCategoria,
    buscarPorNome,
    listarTitulos,
  } = useTituloHook();
  const [selected, setSelected] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      await listarTitulos();
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    switch (selected) {
      case "titulo":
        await buscarPorNome(inputValue);
        break;
      case "ator":
        await buscarPorAtor(inputValue);
        break;
      case "categoria":
        await buscarPorCategoria(inputValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen h-screen ">
      <Select onValueChange={(value) => setSelected(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtro" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="titulo">Título</SelectItem>
            <SelectItem value="ator">Ator</SelectItem>
            <SelectItem value="categoria">Categoria</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Input
          type="text"
          placeholder={`Digite o ${selected || "filtro"}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <DataTableTituloConsulta titulos={titulos!} />
    </div>
  );
}
