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
import { useAtorHook } from "@/hooks/ator";
import { toast } from "@/components/ui/use-toast";
import { Ator } from "@/model/ator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropsAtor {
  ator?: Ator;
}

export function FormNovoAtor({ ator }: PropsAtor) {
  const { criarAtor, editarAtor } = useAtorHook();

  const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome do Ator é obrigatório!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (ator) {
        const editAtor = {
          id: ator.id,
          nome: values.nome,
        };

        await editarAtor(editAtor);

        toast({
          title: "Sucesso!",
          description: "Ator editado com sucesso",
        });
      } else {
        const novoAtor = {
          nome: values.nome,
        };

        await criarAtor(novoAtor);

        toast({
          title: "Sucesso!",
          description: "Ator criado com sucesso",
        });
      }
    } catch {
      toast({
        title: "Erro!",
        description: "Erro ao criar/editar ator",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400 ">Novo Ator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                        <FormLabel>Nome do Ator</FormLabel>
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
                    type="submit"
                    className="bg-slate-400  shadow-md w-1/2 text-lg "
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
