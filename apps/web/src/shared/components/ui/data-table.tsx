"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: DataTablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-6 border-t border-black bg-gray-50">
      <div className="text-sm font-black uppercase tracking-widest text-gray-500 italic">
        PÁGINA <span className="text-black">{currentPage + 1}</span> DE{" "}
        <span className="text-black">{totalPages}</span>
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-white border border-black text-black font-black uppercase italic text-xs tracking-widest h-10 px-6 hover:bg-yellow-400 transition-all disabled:opacity-30 disabled:pointer-events-none rounded-none"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isLoading}
        >
          ANTERIOR
        </Button>
        <Button
          className="bg-white border border-black text-black font-black uppercase italic text-xs tracking-widest h-10 px-6 hover:bg-yellow-400 transition-all disabled:opacity-30 disabled:pointer-events-none rounded-none"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || isLoading}
        >
          PRÓXIMO
        </Button>
      </div>
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  emptyMessage = "NENHUM RESULTADO ENCONTRADO.",
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-black overflow-hidden rounded-none">
      <div className={`transition-opacity ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-6 py-5 text-[10px] font-black text-black uppercase tracking-widest h-auto border-b border-black border-r last:border-r-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-black">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 transition-colors border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4 text-sm text-black font-medium border-r border-black last:border-r-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <DataTablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
