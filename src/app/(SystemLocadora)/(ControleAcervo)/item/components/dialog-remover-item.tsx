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
  import { useItemHook } from "@/hooks/item"; 
  import { Trash2 } from "lucide-react";
  import { useRouter } from "next/navigation";
  
  interface IdItemProps {
    itemId: string;
  }
  
  export function DialogDeletarItem({ itemId }: IdItemProps) {
    const { deletarItem } = useItemHook(); 
    const router = useRouter();
  
    async function removerItem(itemId: string) {
      deletarItem(itemId)
        .then((response) => {
          router.refresh();
          toast({
            title: "Sucesso!",
            description: "O item foi removido com sucesso!",
          });
        })
        .catch((response) => {
          toast({
            title: "Erro!",
            description:
              "Não foi possível remover este item. Verifique se ele possui locações ou tente novamente mais tarde.",
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
                  Tem certeza que deseja remover este item?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-5">
                <AlertDialogAction
                  className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                  onClick={() => removerItem(itemId)}
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
  