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
import { useSocioHook } from "@/hooks/socio";
  import { Trash2 } from "lucide-react";
  import { useRouter } from "next/navigation";
  
  interface IdSocioProps {
    socioId: number;
  }
  
  export function DialogDeletarSocio({ socioId }: IdSocioProps) {
    const { deletarSocio } = useSocioHook();
    const router = useRouter();
  
    async function removerCliente(socioId: number) {
      deletarSocio(socioId)
        .then(() => {
          router.refresh();
          toast({
            title: "Sucesso!",
            description: "O cliente foi removido com sucesso!",
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
        window.location.reload();

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
                  Tem certeza que deseja remover este sócio?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-5">
                <AlertDialogAction
                  className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                  onClick={() => removerCliente(socioId)}
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