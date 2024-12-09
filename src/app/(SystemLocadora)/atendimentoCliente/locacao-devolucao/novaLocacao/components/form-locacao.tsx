import React, { useEffect, useState } from "react";
import { useLocacaoHook } from "@/hooks/locacao";
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
import { Locacao } from "@/model/locacao";
import { useItemHook } from "@/hooks/item";
import { useClienteHook } from "@/hooks/cliente";
import { UserPen } from "lucide-react";

interface PropsLocacao {
  locacao?: Locacao;
}

export function FormNovaLocacao({ locacao }: PropsLocacao) {
  const { criarLocacao, editarLocacao } = useLocacaoHook();
  const { listarClientes, clientes } = useClienteHook();
  const { listarItens, itens } = useItemHook();
  const [isOpen, setIsOpen] = useState(false);
  const [valorCobrado, setValorCobrado] = useState<number | undefined>(
    undefined
  );
  const [isDevolucao, setIsDevolucao] = useState(false);
  const [multaCobrada, setMultaCobrada] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      await listarClientes();
      await listarItens();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    cliente: z.string({ required_error: "Cliente é obrigatório!" }),
    item: z.string({ required_error: "Item é obrigatório!" }),
    valorCobrado: z
      .number()
      .min(1, "O valor deve ser maior que 0")
      .or(
        z.string({ required_error: "Valor é obrigatório!" }).transform(Number)
      ),
    dtLocacao: z.coerce.date({
      errorMap: ({ code }, { defaultError }) => {
        if (code === "invalid_date")
          return { message: "Data de Locação é obrigatória" };
        return { message: defaultError };
      },
    }),
    dtDevolucaoPrevista: z.coerce.date().refine((date) => date > new Date(), {
      message:
        "Data de Devolução Prevista deve ser maior que a data de locação!",
    }),
    dtDevolucaoEfetiva: z.coerce
      .date()
      .refine((date) => date >= new Date(), {
        message:
          "Data de Devolução Efetiva deve ser maior ou igual que a data de locação!",
      })
      .optional(),
    multaCobrada: z.coerce.number().optional(),
    devolver: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: locacao
      ? {
          cliente: locacao.cliente.nome || "",
          item: locacao.item?.id || "",
          valorCobrado: locacao.valorCobrado || valorCobrado,
          dtLocacao: locacao.dtLocacao
            ? new Date(locacao.dtLocacao)
            : new Date(),
          dtDevolucaoPrevista: locacao.dtDevolucaoPrevista
            ? new Date(locacao.dtDevolucaoPrevista)
            : new Date(),
          dtDevolucaoEfetiva: locacao.dtDevolucaoEfetiva
            ? new Date(locacao.dtDevolucaoEfetiva)
            : new Date(),
          multaCobrada: locacao.multaCobrada || 0,
        }
      : {},
  });

  const calcularMulta = (
    dtDevolucaoEfetiva: Date,
    dtDevolucaoPrevista: Date
  ) => {
    if (dtDevolucaoEfetiva > dtDevolucaoPrevista) {
      const diffInMs =
        dtDevolucaoEfetiva.getTime() - dtDevolucaoPrevista.getTime();
      const diasAtraso = Math.floor(diffInMs / (1000 * 3600 * 24));

      return diasAtraso * 5;
    }
    return 0;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.dtDevolucaoEfetiva && values.dtDevolucaoPrevista) {
        const multaCalculada = calcularMulta(
          new Date(values.dtDevolucaoEfetiva),
          new Date(values.dtDevolucaoPrevista)
        );
        setMultaCobrada(multaCalculada);
        form.setValue("multaCobrada", multaCalculada);
      }

      if (locacao) {
        const editLocacao = {
          idLocacao: locacao.idLocacao,
          cliente: { numInscricao: Number(values.cliente) },
          item: { id: values.item },
          valorCobrado: values.valorCobrado,
          dtLocacao: values.dtLocacao,
          dtDevolucaoPrevista: values.dtDevolucaoPrevista,
          multaCobrada: multaCobrada!,
          dtDevolucaoEfetiva: values.dtDevolucaoEfetiva,
        };

        await editarLocacao(editLocacao).then((res) => {
          console.log(res);

          toast({
            title: "Sucesso!",
            description: "Locação editado com sucesso",
          });
          window.location.reload();
        });
      } else {
        const novaLocacao = {
          cliente: { numInscricao: Number(values.cliente) },
          item: { id: values.item },
          valorCobrado: values.valorCobrado,
          dtLocacao: values.dtLocacao,
          dtDevolucaoPrevista: values.dtDevolucaoPrevista,
          multaCobrada: values.multaCobrada || 0,
          dtDevolucaoEfetiva: values.dtDevolucaoEfetiva,
        };
        await criarLocacao(novaLocacao).then((res) => {
          console.log(res);

          toast({
            title: "Sucesso!",
            description: "Locação criada com sucesso!",
          });
          window.location.reload();
        });
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
        {locacao ? (
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
            Nova Locação
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedItem = itens?.find(
                            (item) => item.id === value
                          );
                          field.onChange(value);

                          if (selectedItem) {
                            const valor = selectedItem.titulo.classe.valor || 0;
                            const dataDevolucao =
                              selectedItem.titulo.classe.dataDevolucao;

                            setValorCobrado(valor);
                            form.setValue("valorCobrado", valor);
                            form.setValue(
                              "dtDevolucaoPrevista",
                              new Date(dataDevolucao)
                            );
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border border-[#A7A7A7]">
                            <SelectValue placeholder="Selecione um item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {itens && itens.length > 0 ? (
                            itens.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.titulo.nome}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="sem-itens">
                              Nenhum item encontrado
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="dtLocacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Locação</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : new Date().toISOString().split("T")[0]
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
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="devolver"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel className="pt-2">Devolver?</FormLabel>
                      <FormControl>
                        <Input
                          className="w-4 h-4 "
                          type="checkbox"
                          checked={field.value || isDevolucao}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setIsDevolucao(e.target.checked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {isDevolucao && (
                  <>
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

                    <FormField
                      control={form.control}
                      name="multaCobrada"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Multa Cobrada</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="border border-[#B2B2B2]"
                              placeholder="Multa cobrada"
                              {...field}
                              value={multaCobrada!}
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
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
                  className="bg-slate-400  shadow-md w-1/2 text-lg "
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
