"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormNovoDiretor() {

    const formSchema = z.object({
        nome: z.string().min(1, { message: "Nome do Diretor é obrigatório!" }),
      
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:  {
            nome: "",
        } ,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return(
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='flex h-1/6 justify-between'>
                       
                        <div className='flex w-full justify-end pt-7'>
                            <Button type="submit" className='bg-sky-700 shadow-md w-1/3 text-lg hover:bg-slate-400 '>Salvar</Button>
                        </div>
                    </div>
                    <div className="flex h-alto px-7 items-center justify-start">
                        <div className="w-1/2">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel>Nome do Diretor</FormLabel>
                                        <FormControl>
                                            <Input className="border border-[#A7A7A7] w-5/6"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </form>
            </Form>
    )
}
