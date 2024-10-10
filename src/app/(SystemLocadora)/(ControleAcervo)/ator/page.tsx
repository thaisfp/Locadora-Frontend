"use client";

import { DataTableAtor } from "./components/table-ator";
import { useAtorHook } from "@/hooks/ator";
import { FormNovoAtor } from "./novoAtor/components/dialog-form-ator";

export default function Ator() {
  const { atores } = useAtorHook();
  // const router = useRouter();

  return (
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
  );
}
