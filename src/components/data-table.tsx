import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  Row
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import TablePagination from "./table-pagination"
import { IPagination } from "../hooks/use-pagination"

interface DataTableProps<TData, TValue> {
  title: string
  rightActions?: React.ReactNode
  pagination: IPagination
  columns: ColumnDef<TData, TValue>[];
  data: TData[]
  loading?: boolean,
  cellClassName?: string,
  headerClassName?: string;
  rowClassName?: string | ((data: Row<TData>) => string)
  tableClassName?: string
  tableClassNameEmpty?: string
}

export default function DataTable<TData, TValue>({
  title,
  rightActions,
  pagination,
  columns,
  data,
  loading,
  cellClassName = "",
  headerClassName = "",
  rowClassName = "",
  tableClassName = "",
  tableClassNameEmpty = "",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  console.log(data)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
  })

  return (
    <div className={`h-full w-full grid ${data ? 'grid-rows-[max-content_auto_max-content]' : 'grid-rows-[max-content_auto]'} overflow-hidden gap-4`}>
      <div className="flex justify-between">
        <h1 className="text-lg">{title}</h1>
        {rightActions && <div>{rightActions}</div>}
      </div>
      <Table className={tableClassName}>
        <TableHeader className="sticky top-0 z-10 bg-custom-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={`bg-background-secondary default-border ${headerClassName}`}>
              {headerGroup.headers.map((header) => {
                const headerWithTranslation = typeof header.column.columnDef?.header === "string" ? header.column.columnDef?.header : header.column.columnDef?.header
                return (
                  <TableHead key={header.id} className={"text-[#5a6862] font-normal text-center whitespace-pre"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        headerWithTranslation,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-80 text-center">
                {/* <Loader /> */}
                cargando...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: Row<TData>) => {
              return (
                <TableRow
                  className={`odd:bg-secondary even:bg-background ${typeof rowClassName === "string" ? rowClassName : rowClassName(row)}`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`whitespace-pre text-center element-center ${cellClassName}`}>
                      {flexRender(cell.column.columnDef?.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={`${tableClassNameEmpty ? tableClassNameEmpty : 'h-80 text-center'}`}>
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data &&
        <TablePagination
          {...pagination}
          handleItemsPerPageChange={(take) => {
            pagination.handleItemsPerPageChange(take)
            table.setPageSize(take)
          }}
        />
      }
    </div>
  )
}