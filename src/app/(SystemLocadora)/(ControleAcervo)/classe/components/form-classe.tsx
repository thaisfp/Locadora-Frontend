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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormNovaClasse() {
  const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome do Ator é obrigatório!" }),
    valor: z.string().min(1, { message: "Valor obrigatório!" }),
    dataDevolucao: z.coerce
      .date()
      .refine((data) => data > new Date(), {
        message: "A data de devolução deve ser maior que a data atual.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      valor: "",
      dataDevolucao: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">
        <div className="flex h-1/6 justify-between">
          <div className="flex w-full justify-end pt-7">
            <Button
              type="submit"
              className="bg-sky-700 shadow-md w-1/3 text-lg hover:bg-slate-400 "
            >
              Salvar
            </Button>
          </div>
        </div>
        <div className="flex flex-col pl-10 h-2/3 gap-5">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Classe</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#A7A7A7] w-5/6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#A7A7A7] w-5/6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="dataDevolucao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Devolução</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      // placeholder={arbitragem?.dataCadastro ? format(arbitragem.dataCadastro, 'dd/MM/yyyy') : ''}
                      className="border border-[#A7A7A7] w-1/3"
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
      </form>
    </Form>
  );
}
