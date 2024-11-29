"use client";
/*
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClienteHook } from "@/hooks/cliente"; 
import { toast } from "@/components/ui/use-toast";
import { Cliente } from "@/model/cliente";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useState } from "react";

interface PropsCliente {
  cliente?: Cliente;
}

export function FormNovoCliente({ cliente }: PropsCliente) {
  const { criarCliente, editarCliente } = useClienteHook();
  const [isOpen, setIsOpen] = useState(false);

  // Esquema de validação com Zod
  const formSchema = z.object({
    nome: z
      .string({ required_error: "Nome é obrigatório!" })
      .min(2, { message: "Nome muito curto" }),
    endereco: z.string().optional(),
    telefone: z
      .string()
      .regex(/^\d{10,11}$/, "Telefone inválido"),
    sexo: z.enum(["Masculino", "Feminino", "Outro"], {
      required_error: "Sexo é obrigatório!",
    }),
    cpf: z
      .string()
      .regex(/^\d{11}$/, "CPF inválido")
      .refine((cpf) => validarCpf(cpf), { message: "CPF inválido" }),
    dataNascimento: z
      .string()
      .refine((data) => validarData(data), { message: "Data inválida" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: cliente
      ? {
          nome: cliente.nome || "",
          endereco: cliente.endereco || "",
          telefone: cliente.telefone || "",
          sexo: cliente.sexo || "Outro",
          cpf: cliente.cpf || "",
          dataNascimento: cliente.dataNascimento || "",
        }
      : {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (cliente) {
        const clienteEditado = { ...cliente, ...values };
        await editarCliente(clienteEditado).then(() => {
          toast({ title: "Sucesso!", description: "Cliente editado com sucesso" });
          window.location.reload();
        });
      } else {
        await criarCliente(values).then(() => {
          toast({ title: "Sucesso!", description: "Cliente criado com sucesso" });
          window.location.reload();
        });
      }

      setIsOpen(false);
    } catch {
      toast({
        title: "Erro!",
        description: "Erro ao criar/editar cliente",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400 "
        >
          {cliente ? "Editar Cliente" : "Novo Cliente"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <FormControl>
                      <Input {...field} list="sexo" />
                      <datalist id="sexo">
                        <option value="Masculino" />
                        <option value="Feminino" />
                        <option value="Outro" />
                      </datalist>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-center gap-5">
                <Button type="submit" className="bg-sky-700 shadow-md w-1/2 text-lg hover:bg-slate-400 ">
                  Salvar
                </Button>
                <Button type="button" className="bg-slate-400 shadow-md w-1/2 text-lg " onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function validarCpf(cpf: string): boolean {
  return true;
}

function validarData(data: string): boolean {
  return !isNaN(new Date(data).getTime());
}

*/
