"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovaLocacao } from "../../novaLocacao/components/form-locacao"
import { useLocacaoHook } from "@/hooks/locacao";

interface EditarLocacaoProps {
    params:{
        id: string;
      };
}

export default function EditarLocacao({ params }: EditarLocacaoProps) {
    const {id} = params;
    const { locacao, selecionarLocacao } = useLocacaoHook();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await selecionarLocacao(id);
            setIsLoading(false);
        };
        
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 w-full">
                Carregando...
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            </div>
        );
    }

    return (
        <div>
            <FormNovaLocacao locacao={locacao!}></FormNovaLocacao>
        </div>
    );
}
