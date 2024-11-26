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
import { useDiretorHook } from "@/hooks/diretor";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdDiretorProps {
  diretorId: string;
}

export function DialogDeletarDiretor({ diretorId }: IdDiretorProps) {
  const { deletarDiretor } = useDiretorHook();
  const router = useRouter();

  async function removerDiretor(diretorId: string) {
    deletarDiretor(diretorId)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "O diretor foi removido com sucesso!",
        });
      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possível remover este diretor neste momento, tente mais tarde!",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-slate-300 hover:bg-sky-700  shadow-lg">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja remover este diretor?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-5">
              <AlertDialogAction
                className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                onClick={() => removerDiretor(diretorId)}
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