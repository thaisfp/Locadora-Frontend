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
import { Ator } from "@/model/ator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserPen } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PropsTitulo {
    titulo?: Titulo;
}

export function FormNovoTitulo({ titulo }: PropsTitulo) {
    const { criarTitulo, editarTitulo } = useTituloHook();
    const { listarAtores, atores } = useAtorHook();
    const { listarDiretores, diretores } = useDiretorHook();
    const { listarClasses, classes } = useClasseHook();
    const [selectedAtores, setSelectedAtores] = useState<Ator[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            await listarAtores();
            await listarClasses();
            await listarDiretores();
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formSchema = z.object({
        nome: z.string({ required_error: "Nome do Título é obrigatório!" })
            .min(2, { message: "Número insuficiente de caracteres" }),
        atores: z.array(z.string()).nonempty({ message: "Selecione pelo menos um ator!" }),
        diretor: z.string({ required_error: "Diretor é obrigatório!" }),
        ano: z.coerce.number({ invalid_type_error: "Ano é obrigatório" })
        .min(1900, { message: "Ano deve ser maior que 1900" })
        .max(new Date().getFullYear(), {message: "Ano não pode ser maior que o atual" }),
        sinopse: z.string({ required_error: "Sinopse é obrigatória!" })
            .min(10, { message: "Sinopse deve ter no mínimo 10 caracteres" }),
        categoria: z.string({ required_error: "Categoria é obrigatória!" }),
        classe: z.string({ required_error: "Classe é obrigatória!" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: titulo ? {
            nome: titulo.nome || "",
            atores: titulo.atores?.map((ator) => ator.id) || [],
            diretor: titulo.diretor.id || "",
            ano: titulo?.ano || new Date().getFullYear(),
            sinopse: titulo.sinopse || "",
            categoria: titulo.categoria || "",
            classe: titulo.classe.id || "",
        } : {},
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const atoresSelecionados = values.atores.map(id => {
                const atorEncontrado = atores!.find(ator => ator.id === id);
                if (!atorEncontrado) throw new Error(`Ator com ID ${id} não encontrado.`);
                return atorEncontrado;
            });

            if (titulo) {
                const editTitulo = {
                    idTitulo: titulo?.idTitulo,
                    nome: values.nome,
                    atores: atoresSelecionados,
                    diretor: { id: values.diretor },
                    ano: values.ano,
                    sinopse: values.sinopse,
                    categoria: values.categoria,
                    classe: { id: values.classe },
                };

                await editarTitulo(editTitulo).then((res) => {
                    console.log(res)

                    toast({ title: "Sucesso!", description: "Título editado com sucesso" });
                    window.location.reload();
                })


            } else {
                const novoTitulo = {
                    nome: values.nome,
                    atores: atoresSelecionados,
                    diretor: { id: values.diretor },
                    ano: values.ano,
                    sinopse: values.sinopse,
                    categoria: values.categoria,
                    classe: { id: values.classe },
                };

                await criarTitulo(novoTitulo).then((res) => {
                    console.log(res)

                    toast({ title: "Sucesso!", description: "Título criado com sucesso" });
                    window.location.reload();
                })
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
                                name="atores"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ator(es)</FormLabel>
                                        <Select onValueChange={value => {
                                            const newValue = field.value.includes(value)
                                                ? field.value.filter((v) => v !== value)
                                                : [...field.value, value];
                                            field.onChange(newValue);
                                            setSelectedAtores(atores ? atores.filter(ator => newValue.includes(ator.id)) : []);
                                        }}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder={selectedAtores.length > 0 ?
                                                        (selectedAtores.length === 1 ? selectedAtores[0].nome : `${selectedAtores[0].nome}, ...`)
                                                        : "Selecione os atores"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {atores && atores.length > 0 ? (
                                                    atores.map((ator) => (
                                                        <div key={ator.id} className="flex items-center space-x-2">
                                                            <Checkbox id={`checkbox-${ator.id}`}
                                                                checked={field.value.includes(ator.id)}
                                                                onCheckedChange={() => {
                                                                    const newValue = field.value.includes(ator.id)
                                                                        ? field.value.filter(id => id !== ator.id)
                                                                        : [...field.value, ator.id];
                                                                    field.onChange(newValue);
                                                                    setSelectedAtores(atores.filter(ator => newValue.includes(ator.id)));
                                                                }} />
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
                                name="diretor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diretor</FormLabel>
                                        <Select onValueChange={field.onChange} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder="Selecione um diretor"></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {diretores && diretores.length > 0 ? (
                                                    diretores.map((diretor) => (
                                                        <SelectItem key={diretor.id} value={diretor.id}>
                                                            {diretor.nome}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem disabled value="sem-atores">
                                                        Sem diretores cadastradas
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
                                name="classe"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Classe</FormLabel>
                                        <Select onValueChange={field.onChange} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-[#A7A7A7]">
                                                    <SelectValue placeholder="Selecione uma classe"></SelectValue>
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
                                        <Input
                                            type="number"
                                            className="border border-[#A7A7A7]"
                                            value={field.value}
                                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || '')}
                                        />
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