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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useTituloHook } from "@/hooks/titulo";

interface PropsItem {
    item?: Item;
}

export function FormNovoItem({ item }: PropsItem) {
    const { criarItem, editarItem } = useItemHook();
    const [isOpen, setIsOpen] = useState(false);    
    const { listarTitulos, titulos } = useTituloHook();

    const formSchema = z.object({
        numSerie: z.string({ required_error: "Número de série é obrigatório!" }).min(5, { message: "Número de série inválido" }),
        titulo: z.string({ required_error: "Título é obrigatório!" }).min(2, { message: "Título muito curto" }),
        dtAquisicao: z.date(),
        tipoItem: z.enum(["Fita", "DVD", "BlueRay"], { required_error: "Tipo é obrigatório!" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: item
            ? {
                numSerie: item.numSerie || "",
                titulo: item.titulo.idTitulo || "",
                dtAquisicao: item ? new Date(item.dtAquisicao) : undefined,
                tipoItem: item.tipoItem || "DVD",
            }
            : {},
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("onSubmit chamado com valores:", values);

        try {
            if (item) {
                const editItem = {
                    id: item.id,
                    numSerie: values.numSerie,
                    titulo: { idTitulo: values.titulo },
                    dtAquisicao: values.dtAquisicao, 
                    tipoItem: values.tipoItem,
                };

                console.log("Editando item:", editItem);
                await editarItem(editItem);

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

                console.log("Criando novo item:", novoItem);
                await criarItem(novoItem);

                toast({
                    title: "Sucesso!",
                    description: "Item criado com sucesso",
                });
            }

            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao criar/editar item:", error);
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
                <Button
                    variant="outline"
                    className={item ? "bg-slate-300 hover:bg-sky-700 shadow-md w-full text-lg text-slate-50 hover:text-white" : "bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400"}
                >
                    {item ? <PlusCircle /> : "Novo Item"}
                </Button>
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
                                                <Input className="border border-[#A7A7A7]" {...field} />
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
                                        <FormLabel>Titulo</FormLabel>
                                        <Select onValueChange={field.onChange} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder="Selecione a modalidade"></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {titulos && titulos.length > 0 ? (
                                                    titulos.map((titulo) => (
                                                        <SelectItem key={titulo.idTitulo} value={titulo.idTitulo}>
                                                            {titulo.nome}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem disabled value="sem-titulos">
                                                        Sem titulos cadastradas
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
                                    name="dtAquisicao"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data de Aquisição</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="border border-[#A7A7A7]"
                                                    value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                                    onChange={(e) => field.onChange(new Date(e.target.value))}
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
                                                <select className="border border-[#A7A7A7] w-full" {...field}>
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
