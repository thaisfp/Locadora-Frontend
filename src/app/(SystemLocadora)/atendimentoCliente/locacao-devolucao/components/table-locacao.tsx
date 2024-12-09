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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditarLocacao from "../editarLocacao/[id]/page";

export type Payment = {
  idLocacao: string;
  dtLocacao: Date;
  dtDevolucaoPrevista: Date;
  dtDevolucaoEfetiva?: Date;
  valorCobrado: number;
  multaCobrada?: number;
  cliente: { id: string };
  item: { id: string };
  status: "pendente" | "concluido";
};

export const columns: ColumnDef<Locacao>[] = [
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
      <div className="pl-3 flex justify-center">
        {row.original.cliente.nome}
      </div>
    ),
  },
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => (
      <div className="pl-3 flex justify-center">
        {row.original.item.titulo.nome}
      </div>
    ),
  },
  {
    accessorKey: "dtLocacao",
    header: "Data de Locação",
    cell: ({ row }) => {
      const data = new Date(row.original.dtLocacao);
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
    accessorKey: "dtDevolucaoPrevista",
    header: "Data de Devolução",
    cell: ({ row }) => {
      const data = new Date(row.original.dtDevolucaoPrevista);
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
    accessorKey: "dtDevolucaoEfetiva",
    header: "Data de Devolução Efetiva",
    cell: ({ row }) => {
      const data = row.original.dtDevolucaoEfetiva;

      return (
        <div className="capitalize pl-3 flex justify-center">
          {data
            ? new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" })
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original.dtDevolucaoEfetiva;

      return (
        <div className="capitalize pl-3 flex justify-center">
          {data ? (
            <h1 className="flex bg-green-200 w-full rounded-lg text-lg text-slate-50 hover:text-white justify-center">
              Pago
            </h1>
          ) : (
            <h1 className="flex bg-red-200 w-full rounded-lg text-lg text-slate-50 justify-center">
              pendente
            </h1>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "valorCobrado",
    header: "Valor Total",
    cell: ({ row }) => (
      <div className="pl-3 flex justify-center">
        {row.original.valorCobrado + (row.original.multaCobrada || 0)}
      </div>
    ),
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditarLocacao params={{ id: row.original.idLocacao }} />
            </TooltipTrigger>
            <TooltipContent>Editar/Efetivar Devolução</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogDeletarLocacao idLocacao={row.original.idLocacao} />
            </TooltipTrigger>
            <TooltipContent>Cancelar Locação</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

interface LocacaoProps {
  locacoes: LocacoesArray;
}

export function DataTableLocacao({ locacoes }: LocacaoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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
