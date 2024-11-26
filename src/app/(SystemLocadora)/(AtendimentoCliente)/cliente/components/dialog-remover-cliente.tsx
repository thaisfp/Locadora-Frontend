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
  import { Input } from "@/components/ui/input";
  import { toast } from "@/components/ui/use-toast";
  import { useClienteHook } from "@/hooks/cliente"; 
  import { useState } from "react";
  
  export function DialogCadastrarCliente() {
    const { criarCliente } = useClienteHook(); 
    const [cliente, setCliente] = useState({
      nome: "",
      endereco: "",
      telefone: "",
      sexo: 'M',
      cpf: "",
      dataNascimento: "",
      tipo: 'SOCIO',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCliente((prev) => ({ ...prev, [name]: value }));
    };
  
    async function salvarCliente() {
      try {
        await criarCliente(cliente);
        toast({
          title: "Sucesso!",
          description: "Cliente cadastrado com sucesso!",
        });
        setCliente({ nome: "", endereco: "", telefone: "", sexo: 'M', cpf: "", dataNascimento: "", tipo: 'SOCIO'});
      } catch (error) {
        toast({
          title: "Erro!",
          description: "Não foi possível cadastrar o cliente. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
              Cadastrar Cliente
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cadastro de Cliente</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Nome"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
              />
              <Input
                placeholder="Endereço"
                name="endereco"
                value={cliente.endereco}
                onChange={handleChange}
              />
              <Input
                placeholder="Telefone"
                name="telefone"
                value={cliente.telefone}
                onChange={handleChange}
              />
              <select
                className="border rounded px-3 py-2"
                name="sexo"
                value={cliente.sexo}
                onChange={handleChange}
              >
                <option value="">Selecione o Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <Input
                placeholder="CPF"
                name="cpf"
                value={cliente.cpf}
                onChange={handleChange}
              />
              <Input
                type="date"
                placeholder="Data de Nascimento"
                name="dataNascimento"
                value={cliente.dataNascimento}
                onChange={handleChange}
              />
            </div>
            <AlertDialogFooter className="flex gap-4">
              <AlertDialogAction
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                onClick={salvarCliente}
              >
                Salvar
              </AlertDialogAction>
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400 text-black w-full">
                Cancelar
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  