import { useAtorHook } from "@/hooks/ator"
import { FormNovoAtor } from "./components/dialog-form-ator"

export default function NovoAtor () {

    const{ator} = useAtorHook();

    return(
        <div>
            <FormNovoAtor ator={ator!}></FormNovoAtor>
        </div>
    )
}