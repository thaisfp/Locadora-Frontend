"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormNovoCliente } from "./novoCliente/components/dialog-form-cliente";

export default function Item() {

//   useEffect(() => {
//     const fetchData = async () => {
//       await listarItens();
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-screen p-10 ">
        <div className="w-full h-full p-10">
          <div className="flex justify-end">
            <FormNovoCliente />
          </div>
          <div>
            {/* <DataTableItem itens={itens!} /> */}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
