"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { FormNovoItem } from "../../novoItem/components/dialog-form-item"; 
import { Item } from "../../components/table-item";

interface EditarItemProps {
    params:{
           itemObj: Item;
 
    };
}

export default function EditarItem({params: { itemObj } }: EditarItemProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemObj.id]);

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
            <FormNovoItem item={itemObj!}></FormNovoItem>
        </div>
    );
}
