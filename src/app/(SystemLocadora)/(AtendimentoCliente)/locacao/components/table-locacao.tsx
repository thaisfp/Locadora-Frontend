"use client";

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
import { DialogDeletarLocacao } from "../components/dialog-remover-locacao";
import { Locacao, LocacoesArray } from "@/model/locacao"; 

export type Payment = {
  id: string;
  dtLocacao: Date; 
  dtDevolucaoPrevista: Date; 
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number; 
  cliente: {id: string}; 
  item: {id: string};     
  status: 'pendente' | 'concluido';  
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "cliente",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full gap-2"
      >
        Cliente
        <ArrowUpDown className="w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="pl-3 flex justify-center">{row.original.cliente}</div>
    ),
  },
  {
    accessorKey: "titulo",
    header: "Título",
    cell: ({ row }) => (
      <div className="pl-3 flex justify-center">{row.original.titulo}</div>
    ),
  },
  {
    accessorKey: "dataLocacao",
    header: "Data de Locação",
    cell: ({ row }) => {
      const data = new Date(row.original.dataLocacao);
      return (
        <div className="capitalize pl-3 flex justify-center ">
          {data.toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "dataDevolucao",
    header: "Data de Devolução",
    cell: ({ row }) => {
      const data = new Date(row.original.dataDevolucao);
      return (
        <div className="capitalize pl-3 flex justify-center ">
          {data.toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => (
      <div className="pl-3 flex justify-center">{row.original.valor}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor = status === "pendente" ? "text-red-500" : "text-green-500";

      return (
        <div className={`capitalize pl-3 flex justify-center ${statusColor}`}>
          {status}
        </div>
      );
    },
  },  
  {
    accessorKey: "acoes",
    header: () => (
      <Button variant="ghost" className="w-full">
        Ações
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex gap-5 justify-center">
        <Button variant="ghost" onClick={() => alert(`Editar ${row.original.id}`)}>
          Editar
        </Button>
        <DialogDeletarLocacao locacaoId={row.original.id} />
      </div>
    ),
  },
];

interface LocacaoProps {
  locacoes: LocacoesArray;
}

export function DataTableLocacao({ locacoes }: LocacaoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: locacoes ?? [],
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
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cliente")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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

