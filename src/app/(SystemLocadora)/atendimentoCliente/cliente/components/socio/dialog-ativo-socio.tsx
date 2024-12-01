import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useDependenteHook } from "@/hooks/dependente";
import { useSocioHook } from "@/hooks/socio";
import { Socio } from "@/model/socio";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IdSocioProps {
  socio: Socio;
  ativo: boolean;
}

export function AlertDialogAtivoSocio({ socio, ativo }: IdSocioProps) {
  const { ativarSocio, desativarSocio } = useSocioHook();
  const {} = useDependenteHook();
  const router = useRouter();

  async function HandleAtivarSocio(socio: Socio) {
    ativarSocio(socio)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "O Sócio foi ativado novamente, agora ele poderá ter acesso ao sistema!",
          variant: "default",
        });
        window.location.reload();
      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possivel ativar este Sócio neste momento, tente mais tarde!",
          variant: "destructive",
        });
      });
  }

  async function HandleInativarSocio(socio: Socio) {
    desativarSocio(socio)
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "O Sócio foi desativado e não pode mais usar o sistema!",
          variant: "default",
        });
        window.location.reload();
      })
      .catch(() => {
        toast({
          title: "Erro!",
          description:
            "Não foi possivel inativar este Sócio neste momento, tente mais tarde!",
          variant: "destructive",
        });
      });
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-[#1B254F] " variant="ghost">
            {ativo ? <ToggleRight /> : <ToggleLeft />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {ativo ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja inativar este Sócio?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Ao clicar em SIM o sócio e seus dependentes ficarão desabilitados
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => HandleInativarSocio(socio)}>
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja ativar este Sócio?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Ao clicar em SIM o sócio e seus dependentes voltarão a ficar ativos
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => HandleAtivarSocio(socio)}>
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
