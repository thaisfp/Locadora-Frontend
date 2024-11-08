"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { DialogDeletarTitulo } from "./dialog-remover-titulo";
import { Titulo, TitulosArray } from "@/model/titulo";
import { Ator } from "@/model/ator";
import { Classe } from "@/model/classe";
import { Diretor } from "@/model/diretor";
import EditarTitulo from "../editarTituloo/[id]/page";

export type Payment = {
  id: string;
  nome: string;
  atores: Array<Ator>;
  diretor: Diretor;
  ano: number;
  sinopse: string;
  categoria: string;
  classe: Classe;
};

export const columns: ColumnDef<Titulo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full gap-2"
      >
        Nome do Título
        <ArrowUpDown className="w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-3 flex justify-center">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "atores",
    header: "Atores",
    cell: ({ row }) => (<div className="pl-3 flex justify-center">
        {row.original.atores?.length > 0 ? row.original.atores.map(ator => ator.nome).join(", ") : "Ator(es) não disponível"}
      </div>
    ),
  },
  {
    accessorKey: "diretor",
    header: "Diretor",
    cell: ({ row }) => (<div className="pl-3 flex justify-center">
        {row.original.diretor ? row.original.diretor.nome : "Diretor não disponível"}
      </div>
    ),
  },
  {
    accessorKey: "ano",
    header: "Ano",
    cell: ({ row }) => <div className="pl-3 flex justify-center">{row.getValue("ano")}</div>,
  },
  {
    accessorKey: "sinopse",
    header: "Sinopse",
    cell: ({ row }) => <div className="pl-3">{row.getValue("sinopse")}</div>,
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    cell: ({ row }) => <div className="pl-3 flex justify-center">{row.getValue("categoria")}</div>,
  },
  {
    accessorKey: "classe",
    header: "Classe",
    cell: ({ row }) => 
    <div className="pl-3 flex justify-center">
      {row.original.classe ? row.original.classe.nome : "Classe não disponível"}
      </div>,
  },
  {
    accessorKey: "acoes",
    header: ({}) => {
      return (
        <Button variant="ghost" className="w-full">
          Ações
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex gap-5 justify-center ">
        <EditarTitulo tituloObj={row.original}></EditarTitulo>

        <DialogDeletarTitulo tituloId={row.original.idTitulo}/>
      </div>
    ),
  },
];

interface PropsTitulo {
  titulos: TitulosArray;
}

export function DataTableTitulo({ titulos }: PropsTitulo) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: titulos ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}