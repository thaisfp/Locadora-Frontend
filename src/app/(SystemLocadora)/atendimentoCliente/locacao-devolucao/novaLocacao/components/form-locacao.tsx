import React, { useState } from "react";
import { useLocacaoHook } from "@/hooks/locacao";
import { Cliente } from "@/model/cliente";
import { Item } from "@/model/item";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locacao } from "@/model/locacao"

interface PropsLocacao {
  locacao?: Locacao;
}

export function FormNovaLocacao({ locacao }: PropsLocacao) {
  const { criarLocacao, editarLocacao } = useLocacaoHook();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    cliente: z.string().nonempty("Cliente é obrigatório!"),
    item: z.string().nonempty("Item é obrigatório!"),
    valorCobrado: z
      .number()
      .min(1, "O valor deve ser maior que 0")
      .or(z.string().nonempty("Valor é obrigatório!").transform(Number)),
    dtLocacao: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    ),
    dtDevolucaoPrevista: z.date().refine((date) => date > new Date(), {
      message: "Data prevista deve ser futura!",
    }),
    dtDevolucaoEfetiva: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date())
      .optional(),
    multaCobrada: z.number().min(0, "Multa deve ser igual ou maior que zero"),
    status: z.enum(["pendente", "concluido"]).default("pendente"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: locacao
      ? {
        cliente: locacao.cliente.nome || "",
        item: locacao.item?.id || "",
        valorCobrado: locacao.valorCobrado || 0,
        dtLocacao: locacao.dtLocacao ? new Date(locacao.dtLocacao) : undefined,
        dtDevolucaoPrevista: locacao.dtDevolucaoPrevista
          ? new Date(locacao.dtDevolucaoPrevista)
          : undefined,
        multaCobrada: locacao.multaCobrada || 0,
        status: locacao.status || "pendente",
      }
      : {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (locacao) {
        const editLocacao = {
          idLocacao: locacao.idLocacao,
          cliente: { id: values.cliente },
          item: { id: values.item },
          valorCobrado: values.valorCobrado,
          dtLocacao: values.dtLocacao,
          dtDevolucaoPrevista: values.dtDevolucaoPrevista,
          multaCobrada: values.multaCobrada,
          status: values.status,
        };

        await editarLocacao(editLocacao).then((res) => {
          console.log(res)

          toast({ title: "Sucesso!", description: "Locação editado com sucesso" });
          window.location.reload();
        })

      } else {
        const novaLocacao = {
          cliente: { id: values.cliente },
          item: { id: values.item },
          valorCobrado: values.valorCobrado,
          dtLocacao: new Date(),
          dtDevolucaoPrevista: new Date(),
          multaCobrada: values.multaCobrada || 0,
          status: values.status || 'pendente',
        };

        await criarLocacao(novaLocacao).then((res) => {
          console.log(res)

          toast({ title: "Sucesso!", description: "Locação criada com sucesso!" });
          window.location.reload();
        })
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao criar/editar locação:", error);

      toast({
        title: "Erro!",
        description: "Erro ao criar/editar locação",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400"
        >
          {locacao ? "Editar Locação" : "Nova Locação"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col space-y-4">
                {/* Cliente Field */}
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full border border-[#A7A7A7]">
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientes && clientes.length > 0 ? (
                            clientes.map((cliente) => (
                              <SelectItem
                                key={cliente.numInscricao}
                                value={cliente.numInscricao.toString()}
                              >
                                {cliente.nome}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value={"sem-clientes"}>
                              Nenhum cliente encontrado
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Item Field */}
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full border border-[#A7A7A7]">
                            <SelectValue placeholder="Selecione um item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {itens && itens.length > 0 ? (
                            itens.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.nome}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value={"sem-itens"}>
                              Nenhum item encontrado
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Valor Cobrado Field */}
                <FormField
                  control={form.control}
                  name="valorCobrado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Cobrado</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border border-[#A7A7A7]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de Locação */}
                <FormField
                  control={form.control}
                  name="dtLocacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Locação</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border border-[#A7A7A7]"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de Devolução Prevista */}
                <FormField
                  control={form.control}
                  name="dtDevolucaoPrevista"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Devolução Prevista</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border border-[#A7A7A7]"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de Devolução Efetiva */}
                <FormField
                  control={form.control}
                  name="dtDevolucaoEfetiva"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Devolução Efetiva</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border border-[#A7A7A7]"
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Multa Cobrada */}
                <FormField
                  control={form.control}
                  name="multaCobrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Multa Cobrada</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border border-[#A7A7A7]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dtLocacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Locação</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ? field.value.toISOString().split("T")[0] : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};