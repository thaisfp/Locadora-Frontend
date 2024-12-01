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
import { useDependenteHook } from "@/hooks/dependente";
import { Dependente } from "@/model/dependente";
import { Trash2 } from "lucide-react";

interface IdClienteProps {
  cliente: Dependente;
}

export function DialogDeletarCliente({ cliente }: IdClienteProps) {
  const { deletarDependente } = useDependenteHook();

  async function removerCliente(clienteId: number) {
    try {
      await deletarDependente(clienteId);
      toast({
        title: "Sucesso!",
        description: "O cliente foi removido com sucesso!",
      });
      window.location.reload();

    }catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Erro ao remover cliente. Verifique os dados e tente novamente.";
      toast({
        title: "Erro!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-slate-300 hover:bg-sky-700 shadow-lg">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover este cliente?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-5">
          <AlertDialogAction
            className="bg-sky-700 hover:bg-slate-300 shadow-md w-full text-lg text-slate-50 hover:text-white"
            onClick={() => removerCliente(cliente.numInscricao)}
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
