import { useAtorHook } from "@/hooks/ator";
import { FormNovoAtor } from "../../novoAtor/components/dialog-form-ator";
import { useEffect, useState } from "react";


interface EditarAtorProps{
    params:{
        id: string;
    };
};

export default function NovoAtor ({params: {id}}: EditarAtorProps) {

    const{ator, selecionarAtor} = useAtorHook();
    const[ isLoading, setIsLoading] = useState();

    useEffect(() => {
        const fetchData = async () => {
          await selecionarAtor(id);
          setIsLoading(false);
        };
    
        fetchData();
      }, [id, selecionarAtor]);

    return(
        <div>
            <FormNovoAtor ator={ator!}></FormNovoAtor>
        </div>
    )
}