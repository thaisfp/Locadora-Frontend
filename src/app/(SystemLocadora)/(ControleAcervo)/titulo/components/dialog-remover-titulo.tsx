import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { toast } from "@/components/ui/use-toast";
  import { useTituloHook } from "@/hooks/titulo";
  import { Trash2 } from "lucide-react";
  import { useRouter } from "next/navigation";
  
  interface IdTituloProps {
    tituloId: string;
  }
  
  export function DialogDeletarTitulo({ tituloId }: IdTituloProps) {
    const { deletarTitulo } = useTituloHook();
    const router = useRouter();
  
    async function removerTitulo(tituloId: string) {
      deletarTitulo(tituloId)
        .then(() => {
          router.refresh();
          toast({
            title: "Sucesso!",
            description: "O título foi removido com sucesso!",
          });
        })
        .catch(() => {
          toast({
            title: "Erro!",
            description:
              "Não foi possível remover este título. Verifique se ele possui itens ou tente novamente mais tarde.",
            variant: "destructive",
          });
        });
    }
  
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className="bg-slate-300 hover:bg-sky-700 shadow-lg">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja remover este título?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-5">
                <AlertDialogAction
                  className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                  onClick={() => removerTitulo(tituloId)}
                >
                  Sim
                </AlertDialogAction>
                <AlertDialogCancel className="bg-slate-300 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white">
                  Não
                </AlertDialogCancel>
              </AlertDialogFooter>
            </>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }