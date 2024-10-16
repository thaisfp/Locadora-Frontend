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
import { useAtorHook } from "@/hooks/ator";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdAtorProps {
  atorId: string;
}

export function DialogDeletarAtor({ atorId }: IdAtorProps) {
  const { deletarAtor } = useAtorHook();
  const router = useRouter();

  async function removerAtor(atorId: string) {
    deletarAtor(atorId)
      .then((response) => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "O atleta foi ativado novamente, agora ele poderá ter acesso ao sistema!",
        });
      })
      .catch((response) => {
        toast({
          title: "Erro!",
          description:
            "Não foi possivel ativar este atleta neste momento, tente mais tarde!",
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
                Tem certeza que deseja remover este ator?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-5">
              <AlertDialogAction
                className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                onClick={() => removerAtor(atorId)}
              >
                Sim
              </AlertDialogAction>
              <AlertDialogCancel className="bg-slate-300 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white">Não</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
