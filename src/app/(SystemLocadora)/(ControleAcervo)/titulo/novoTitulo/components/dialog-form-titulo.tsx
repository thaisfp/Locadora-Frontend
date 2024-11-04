import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTituloHook } from "@/hooks/titulo";
import { useAtorHook } from "@/hooks/ator";
import { useDiretorHook } from "@/hooks/diretor";
import { useClasseHook } from "@/hooks/classe";
import { toast } from "@/components/ui/use-toast";
import { Titulo } from "@/model/titulo";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropsTitulo {
    titulo?: Titulo;
}

export function FormNovoTitulo({ titulo }: PropsTitulo) {
    const { criarTitulo, editarTitulo, listarTitulos } = useTituloHook();
    const { listarAtores, atores } = useAtorHook();
    const { listarDiretores, diretores } = useDiretorHook();
    const { listarClasses, classes } = useClasseHook();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            listarAtores();
            listarDiretores();
            listarClasses();
        }
    }, [isOpen]);

    const formSchema = z.object({
        nome: z.string({ required_error: "Nome do Título é obrigatório!" })
            .min(2, { message: "Número insuficiente de caracteres" }),
        ator: z.string({ required_error: "Ator é obrigatório!" }),
        diretor: z.string({ required_error: "Diretor é obrigatório!" }),
        ano: z.number({ invalid_type_error: "Ano é obrigatório" })
            .min(1900, { message: "Ano deve ser maior que 1900" }),
        sinopse: z.string({ required_error: "Sinopse é obrigatória!" })
            .min(10, { message: "Sinopse deve ter no mínimo 10 caracteres" }),
        categoria: z.string({ required_error: "Categoria é obrigatória!" }),
        classe: z.string({ required_error: "Classe é obrigatória!" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: titulo ? {
            nome: titulo.nome || "",
            ator: "",
            diretor: titulo.diretor.id || "",
            ano: titulo.ano || new Date().getFullYear(),
            sinopse: titulo.sinopse || "",
            categoria: titulo.categoria || "",
            classe: titulo.classe.id || "",
        } : {
            nome: "",
            ator: "",
            diretor: "",
            ano: new Date().getFullYear(),
            sinopse: "",
            categoria: "",
            classe: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (titulo) {
                const editTitulo = {
                    id: titulo.id,
                    nome: values.nome,
                    ator: { id: values.ator },
                    diretor: { id: values.diretor },
                    ano: values.ano,
                    sinopse: values.sinopse,
                    categoria: values.categoria,
                    classe: { id: values.classe },
                };

                await editarTitulo(editTitulo);
                toast({ title: "Sucesso!", description: "Título editado com sucesso" });
            } else {
                const novoTitulo = {
                    nome: values.nome,
                    ator: { id: values.ator },
                    diretor: { id: values.diretor },
                    ano: values.ano,
                    sinopse: values.sinopse,
                    categoria: values.categoria,
                    classe: { id: values.classe },
                };

                await criarTitulo(novoTitulo);
                toast({ title: "Sucesso!", description: "Título criado com sucesso" });
            }

            setIsOpen(false);
        } catch {
            toast({
                title: "Erro!",
                description: "Erro ao criar/editar título",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {titulo ? (
                    <Button variant="outline" className="bg-slate-300 hover:bg-sky-700 shadow-md w-full text-lg text-slate-50 hover:text-white">
                        <UserPen />
                    </Button>
                ) : (
                    <Button variant="outline" className="bg-sky-700 shadow-md w-1/6 text-lg text-slate-50 hover:bg-slate-400">
                        Novo Título
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                            <FormField control={form.control} name="nome" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Título</FormLabel>
                                    <FormControl>
                                        <Input className="border border-[#A7A7A7]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField
                                control={form.control}
                                name="ator"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Classe</FormLabel>
                                        <Select onValueChange={field.onChange} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder="Selecione a modalidade"></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {atores && atores.length > 0 ? (
                                                    atores.map((ator) => (
                                                        <div key={ator.id} className="flex items-center space-x-2">
                                                            <Checkbox id={`checkbox-${ator.id}`}>
                                                            </Checkbox>
                                                            <label htmlFor={`checkbox-${ator.id}`}>{ator.nome}</label>

                                                        </div>
                                                    ))
                                                ) : (
                                                    <div >
                                                        Sem atores cadastrados
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="classe"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Classe</FormLabel>
                                        <Select onValueChange={field.onChange} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder="Selecione a modalidade"></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {classes && classes.length > 0 ? (
                                                    classes.map((classe) => (
                                                        <SelectItem key={classe.id} value={classe.id}>
                                                            {classe.nome}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem disabled value="sem-atores">
                                                        Sem classes cadastradas
                                                    </SelectItem>
                                                )}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField control={form.control} name="ano" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ano</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="border border-[#A7A7A7]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />


                            <FormField control={form.control} name="sinopse" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sinopse</FormLabel>
                                    <FormControl>
                                        <Input className="border border-[#A7A7A7]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="categoria" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Input className="border border-[#A7A7A7]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Seletor de Classes
                            <FormField control={form.control} name="classe" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Classe</FormLabel>
                                    <FormControl>
                                        <Select.Root onValueChange={field.onChange} value={field.value}>
                                            <Select.Trigger className="w-full p-1 border rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-700 transition duration-150 ease-in-out">
                                                <Select.Value placeholder="Selecione uma classe" />
                                                <Select.Icon>
                                                    <span className="text-gray-500">▼</span>
                                                </Select.Icon>
                                            </Select.Trigger>
                                            <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
                                                <Select.ScrollUpButton className="flex items-center justify-center h-8 cursor-default bg-gray-100 hover:bg-gray-200">
                                                    ↑
                                                </Select.ScrollUpButton>
                                                <Select.Viewport>
                                                    {(classes ?? []).map((classe) => (
                                                        <Select.Item key={classe.id} value={classe.nome} className="cursor-pointer p-2 hover:bg-gray-200">
                                                            <Select.ItemText>{classe.nome}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Viewport>
                                                <Select.ScrollDownButton className="flex items-center justify-center h-8 cursor-default bg-gray-100 hover:bg-gray-200">
                                                    ↓
                                                </Select.ScrollDownButton>
                                            </Select.Content>
                                        </Select.Root>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} /> */}

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