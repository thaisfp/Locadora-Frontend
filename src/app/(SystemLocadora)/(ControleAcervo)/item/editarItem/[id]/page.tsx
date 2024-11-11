"use client";

import { useItemHook } from "@/hooks/item";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoItem } from "../../novoItem/components/dialog-form-item"; 

interface EditarItemProps {
    id: string;
}

export default function EditarItem({ id }: EditarItemProps) {
    const { item, selecionarItem } = useItemHook();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await selecionarItem(id); // Seleciona o item com o ID específico
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
            <FormNovoItem item={item!}></FormNovoItem> {/* Passa o item selecionado para o formulário */}
        </div>
    );
}
