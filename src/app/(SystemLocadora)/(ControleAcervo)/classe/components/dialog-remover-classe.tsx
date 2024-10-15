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
import { useClasseHook } from "@/hooks/classe";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdClasseProps {
  classeId: string;
}

export function DialogDeletarClasse({ classeId }: IdClasseProps) {
  const { deletarClasse } = useClasseHook();
  const router = useRouter();

  async function removerClasse(classeId: string) {
    deletarClasse(classeId)
      .then((response) => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "A classe foi removida com sucesso!",
        });
      })
      .catch((response) => {
        toast({
          title: "Erro!",
          description:
            "Não foi possível remover esta classe, tente novamente mais tarde.",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-slate-300 hover:bg-sky-700 ">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja remover esta classe?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-5">
              <AlertDialogAction
                className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
                onClick={() => removerClasse(classeId)}
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
