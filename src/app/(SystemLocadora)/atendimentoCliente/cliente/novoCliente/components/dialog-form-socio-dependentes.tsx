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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Dependente } from "@/model/dependente";
import { useSocioHook } from "@/hooks/socio";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useDependenteHook } from "@/hooks/dependente";

interface ClienteProps {
  params: {
    clienteObj: Dependente;
  };
}

export function FormSocio({ params: { clienteObj } }: ClienteProps) {
  const { criarSocio } = useSocioHook();
  const { dependentes, listarDependentes } = useDependenteHook();
  const [selectedDependentes, setSelectedDependentes] = useState<Dependente[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await listarDependentes();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    cpf: z.string({ required_error: "CPF é obrigatório!" }),
    endereco: z.string({ required_error: "Endereço é obrigatório!" }),
    tel: z.string({ required_error: "Endereço é obrigatório!" }),
    dependentes: z
      .array(z.string())
      .nonempty({ message: "Selecione pelo menos um dependente!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      endereco: "",
      dependentes: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dependentesSelecionados = values.dependentes.map((nome) => {
      const dependentesEncontrados = dependentes!.find(
        (dependente) => dependente.nome === nome
      );
      if (!dependentesEncontrados)
        throw new Error(`Ator com nome ${nome} não encontrado.`);
      return dependentesEncontrados;
    });
    if (clienteObj) {
      const novoSocio = {
        numInscricao: clienteObj.numInscricao,
        nome: clienteObj.nome,
        dtNascimento: clienteObj.dtNascimento,
        sexo: clienteObj.sexo,
        estahAtivo: clienteObj.estahAtivo,
        cpf: values.cpf,
        endereco: values.endereco,
        tel: values.tel,
        dependentes: dependentesSelecionados,
      };

      await criarSocio(novoSocio).then((res) => {
        console.log(res);

        toast({
          title: "Sucesso!",
          description: "Cliente editado com sucesso",
        });
        window.location.reload();
      });
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {clienteObj ? (
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
            Novo Cliente
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex h-alto items-center justify-start">
                <div className="w-full flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
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
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
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
                    name="tel"
                    render={({ field }) => (
                      <FormItem className="flex-col">
                        <FormLabel>Telefone</FormLabel>
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
                    name="dependentes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adicione dependentes</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const alreadySelected = field.value.includes(value);

                            const updatedValues = alreadySelected
                              ? field.value.filter((v) => v !== value)
                              : [...field.value, value];

                            field.onChange(updatedValues);

                            setSelectedDependentes(
                              dependentes?.filter((dependente) =>
                                updatedValues.includes(dependente.nome)
                              ) || []
                            );
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full border border-[#A7A7A7]">
                              <SelectValue
                                placeholder={
                                  field.value.length > 0
                                    ? field.value.length === 1
                                      ? field.value[0]
                                      : `${field.value[0]}, ...`
                                    : "Selecione os dependentes"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dependentes && dependentes.length > 0 ? (
                              dependentes.map((dependente) => (
                                <div
                                  key={dependente.numInscricao}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`checkbox-${dependente.numInscricao}`}
                                    checked={field.value.includes(
                                      dependente.nome
                                    )}
                                    onCheckedChange={(checked) => {
                                      const updatedValues = checked
                                        ? [...field.value, dependente.nome]
                                        : field.value.filter(
                                            (nome) => nome !== dependente.nome
                                          );

                                      field.onChange(updatedValues);

                                      setSelectedDependentes(
                                        dependentes?.filter((dep) =>
                                          updatedValues.includes(dep.nome)
                                        ) || []
                                      );
                                    }}
                                  />
                                  <label
                                    htmlFor={`checkbox-${dependente.numInscricao}`}
                                  >
                                    {dependente.nome}
                                  </label>
                                </div>
                              ))
                            ) : (
                              <div>Sem atores cadastrados</div>
                            )}
                          </SelectContent>
                        </Select>
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
