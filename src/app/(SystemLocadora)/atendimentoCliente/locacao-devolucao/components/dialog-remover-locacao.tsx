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
import { useLocacaoHook } from "@/hooks/locacao";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdLocacaoProps {
  idLocacao: string;
}

export function DialogDeletarLocacao({ idLocacao }: IdLocacaoProps) {
  const { deletarLocacao } = useLocacaoHook();
  const router = useRouter();

  async function removerLocacao(locacaoId: string) {
    deletarLocacao(locacaoId)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "A locação foi removida com sucesso!",
        });
        window.location.reload();

      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possível remover esta locação. Verifique se ela está ativa ou tente novamente mais tarde.",
          variant: "destructive",
        });
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-700 shadow-lg">
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja cancelar esta locação?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-5">
          <AlertDialogAction
            className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
            onClick={() => removerLocacao(idLocacao)}
          >
            Sim
          </AlertDialogAction>
          <AlertDialogCancel className="bg-slate-300 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white">
            Não
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
