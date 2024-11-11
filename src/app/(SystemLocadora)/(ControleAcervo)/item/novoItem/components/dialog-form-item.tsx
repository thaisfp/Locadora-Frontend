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
import { useItemHook } from "@/hooks/item";
import { toast } from "@/components/ui/use-toast";
import { Item } from "@/model/item";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface PropsItem {
    item?: Item;
}

export function FormNovoItem({ item }: PropsItem) {
    const { criarItem, editarItem } = useItemHook();
    const [isOpen, setIsOpen] = useState(false);

    // Esquema Zod comentado para testar sem validação
    /* const formSchema = z.object({
        numSerie: z.string().min(5, { message: "Número de série inválido" }),
        titulo: z.string().min(2, { message: "Título muito curto" }),
        dtAquisicao: z.date(),
        tipoItem: z.enum(["Fita", "DVD", "BlueRay"]),
    }); */

    const form = useForm({
        // Temporariamente, comentamos o resolver para testar sem validação
        // resolver: zodResolver(formSchema),
        defaultValues: item
            ? {
                numSerie: item.numSerie || "",
                titulo: item.titulo.idTitulo || "",
                dtAquisicao: item.dtAquisicao ? new Date(item.dtAquisicao) : undefined,
                tipoItem: item.tipoItem || "DVD",
            }
            : {},
    });

    async function onSubmit(values: any) {
        console.log("Início de onSubmit", values); // Log para ver os valores do formulário

        try {
            if (item) {
                const editItem = {
                    id: item.id,
                    numSerie: values.numSerie,
                    titulo: { idTitulo: values.titulo },
                    dtAquisicao: values.dtAquisicao,
                    tipoItem: values.tipoItem,
                };

                await editarItem(editItem);
                console.log("Item editado com sucesso");

                toast({
                    title: "Sucesso!",
                    description: "Item editado com sucesso",
                });
            } else {
                const novoItem = {
                    numSerie: values.numSerie,
                    titulo: { idTitulo: values.titulo },
                    dtAquisicao: new Date(),
                    tipoItem: values.tipoItem,
                };

                await criarItem(novoItem);
                console.log("Item criado com sucesso");

                toast({
                    title: "Sucesso!",
                    description: "Item criado com sucesso",
                });
            }

            setIsOpen(false); // Fechar o modal após a submissão
        } catch (error) {
            console.error("Erro ao salvar item", error); // Log de erro
            toast({
                title: "Erro!",
                description: "Erro ao criar/editar item",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {item ? (
                    <Button
                        variant="outline"
                        className="bg-slate-300 hover:bg-sky-700 shadow-md w-full text-lg text-slate-50 hover:text-white"
                    >
                        <PlusCircle />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400"
                    >
                        Novo Item
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col space-y-4">
                                <FormField
                                    control={form.control}
                                    name="numSerie"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Série</FormLabel>
                                            <FormControl>
                                                <Input
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
                                    name="titulo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título</FormLabel>
                                            <FormControl>
                                                <Input
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
                                    name="dtAquisicao"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data de Aquisição</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="border border-[#A7A7A7]"
                                                    value={field.value ? field.value.toISOString().split('T')[0] : ''} // Conversão para string
                                                    onChange={(e) => field.onChange(new Date(e.target.value))} // Conversão para Date
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tipoItem"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <FormControl>
                                                <select
                                                    className="border border-[#A7A7A7] w-full"
                                                    {...field}
                                                >
                                                    <option value="Fita">Fita</option>
                                                    <option value="DVD">DVD</option>
                                                    <option value="BlueRay">BlueRay</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex w-full items-center justify-center gap-5">
                                <Button
                                    type="submit"
                                    className="bg-sky-700 shadow-md w-1/2 text-lg hover:bg-slate-400"
                                >
                                    Salvar
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-slate-400 shadow-md w-1/2 text-lg"
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
