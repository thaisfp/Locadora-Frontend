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
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdClienteProps {
  cliente: Dependente;
  ativo: boolean;
}

export function AlertDialogAtivoCliente({ cliente, ativo }: IdClienteProps) {
  const { ativarDependente, desativarDependente } = useDependenteHook();
  const router = useRouter();

  async function HandleAtivarCliente(cliente: Dependente) {
    ativarDependente(cliente)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "O Cliente foi ativado novamente, agora ele poderá ter acesso ao sistema!",
          variant: "default",
        });
        window.location.reload();

      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possivel ativar este Cliente neste momento, tente mais tarde!",
          variant: "destructive",
        });
      });
  }

  async function HandleInativarCliente(cliente: Dependente) {
    desativarDependente(cliente)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "O Cliente foi desativado e não pode mais usar o sistema!",
          variant: "default",
        });
        window.location.reload();

      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possivel inativar este Cliente neste momento, tente mais tarde!",
          variant: "destructive",
        });
      });
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-[#1B254F] " variant="ghost">
            {ativo ? <ToggleRight /> : <ToggleLeft/>}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {ativo ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja inativar este Cliente?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => HandleInativarCliente(cliente)}
                >
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja ativar este Cliente?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => HandleAtivarCliente(cliente)}>
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
