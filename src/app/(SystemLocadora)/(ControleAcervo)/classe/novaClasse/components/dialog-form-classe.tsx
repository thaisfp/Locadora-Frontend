"use client";

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
import { useClasseHook } from "@/hooks/classe";
import { toast } from "@/components/ui/use-toast";
import { Classe } from "@/model/classe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPen } from "lucide-react";
import { useState } from "react";

interface PropsClasse {
  classe?: Classe;
}

export function FormNovaClasse({ classe }: PropsClasse) {
  const { criarClasse, editarClasse } = useClasseHook();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome da Classe é obrigatório!" }),
    valor: z.coerce
      .number({
        invalid_type_error: "Valor é obrigatório",
      })
      .min(1, { message: "Valor deve ser maior que 0" }),

    dataDevolucao: z.coerce.date({
        errorMap: ({ code }, { defaultError }) => {
          if (code === "invalid_date") return { message: "Data é obrigatória" };
          return { message: defaultError };
        },
      })
      .refine(
        (data) => {
          return data > new Date();
        },
        { message: "Data de devolução deve ser maior que a atual" }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: classe
      ? {
          nome: classe.nome || "",
          valor: 0 || classe.valor,
          dataDevolucao: classe.dataDevolucao ? new Date(classe.dataDevolucao) : new Date() ,
        }
      : {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (classe) {
        const editClasse = {
          id: classe.id,
          nome: values.nome,
          valor: values.valor,
          dataDevolucao: values.dataDevolucao,
        };

        await editarClasse(editClasse);

        toast({
          title: "Sucesso!",
          description: "Classe editada com sucesso",
        });
      } else {
        const novaClasse = {
          nome: values.nome,
          valor: values.valor,
          dataDevolucao: values.dataDevolucao,
        };

        await criarClasse(novaClasse);

        toast({
          title: "Sucesso!",
          description: "Classe criada com sucesso",
        });
      }

      setIsOpen(false);
    } catch {
      toast({
        title: "Erro!",
        description: "Erro ao criar/editar classe",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {classe ? (
          <Button
            variant="outline"
            className="bg-slate-300 hover:bg-sky-700 shadow-md w-full text-lg text-slate-50 hover:text-white"
          >
            <UserPen />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400 "
          >
            Nova Classe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <p id="dialog-description"></p>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex h-alto items-center justify-start">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Classe</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#A7A7A7] "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="valor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border border-[#A7A7A7] "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dataDevolucao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Devolução</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="border border-[#A7A7A7]"
                            {...field}
                            value={
                              field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-5">
                <Button
                  type="submit"
                  className="bg-sky-700 shadow-md w-1/2 text-lg hover:bg-slate-400 "
                >
                  Salvar
                </Button>
                <Button
                  type="button"
                  className="bg-slate-400 shadow-md w-1/2 text-lg "
                  onClick={() => setIsOpen(false)}
                >
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
