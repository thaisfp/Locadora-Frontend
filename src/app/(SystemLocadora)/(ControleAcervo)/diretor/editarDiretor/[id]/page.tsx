"use client"

import { useDiretorHook } from "@/hooks/diretor";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoDiretor } from "../../novoDiretor/components/dialog-form-diretor";


interface EditarDiretorProps {
    id: string;
}

export default function EditarDiretor({ id }: EditarDiretorProps) {
    const { diretor, selecionarDiretor } = useDiretorHook();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await selecionarDiretor(id);
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
            <FormNovoDiretor diretor={diretor!}></FormNovoDiretor>
        </div>
    );
}