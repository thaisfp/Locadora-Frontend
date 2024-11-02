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
import { useDiretorHook } from "@/hooks/diretor";
import { toast } from "@/components/ui/use-toast";
import { Diretor } from "@/model/diretor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPen } from "lucide-react";
import { useState } from "react";

interface PropsDiretor {
    diretor?: Diretor;
}

export function FormNovoDiretor({ diretor }: PropsDiretor) {
    const { criarDiretor, editarDiretor } = useDiretorHook();
    const [isOpen, setIsOpen] = useState(false);

    const formSchema = z.object({
        nome: z.string({required_error: "Nome do Diretor é obrigatório!"}).min(2, { message: "Número insuficiente de caracteres" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: diretor
            ? {
                nome: diretor.nome || "",
            }
            : {},
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (diretor) {
                const editDiretor = {
                    id: diretor.id,
                    nome: values.nome,
                };

                await editarDiretor(editDiretor);

                toast({
                    title: "Sucesso!",
                    description: "Diretor editado com sucesso",
                });
            } else {
                const novoDiretor = {
                    nome: values.nome,
                };

                await criarDiretor(novoDiretor);

                toast({
                    title: "Sucesso!",
                    description: "Diretor criado com sucesso",
                });
            }

            setIsOpen(false);

        } catch {
            toast({
                title: "Erro!",
                description: "Erro ao criar/editar diretor",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {diretor ? (
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
                        Novo Diretor
                    </Button>
                )}
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
                                                <FormLabel>Nome do Diretor</FormLabel>
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