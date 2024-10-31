import { useEffect, useState } from "react"
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
// import isEmpty from "is-empty"
// import Loader from "./loader"
// import { Filter } from '@/models/components/react-table'
// import { THeader } from "@/models/components/table"
// import { useTranslation } from "react-i18next"
// import SelectMenu from "./select-menu"
// import { Input } from "./ui/input"
// import { ListStartIcon } from "@/lib/icons"

// interface TSelectOption {
//   label: string;
//   value: string;
// }
interface DataTableProps<TData, TValue> {
  title: string
  rightActions?: React.ReactNode

  columns: ColumnDef<TData, TValue>[];
  // header?: THeader[];
  // titleHeader?: THeader[];
  // titleHeaderSelect?: THeader[];
  handleSelectedMenu?: (data: string) => void;
  selectedInstrument?: string;
  instruments?:
  { symbol: string, id: string }[];
  data: TData[]
  onRowClick?: (data: TData) => void
  cellClassName?: string,
  headerClassName?: string;
  // pagination: {
  //   filterPagination: Record<string, number>;
  //   handlePageChange: (newPage: number, validate: boolean) => void;
  //   pageRange: number[];
  //   totalPages: number;
  //   handleItemsPerPageChange: (newItemsPerPage: number) => void
  // },
  loading?: boolean,
  showHeader?: boolean,
  showFilters?: boolean,
  rowClassName?: string | ((data: Row<TData>) => string)
  showAllData?: boolean,
  tableClassName?: string
  TableClassNameEmpty?: string
  id?: string
  filterClassName?: string
  noResultsMessage?: string
  transl?: boolean,
  onSingleClick?: (data: TData) => void
}

export default function DataTable<TData, TValue>({
  title,
  rightActions,

  columns,
  // header,
  // titleHeader,
  // titleHeaderSelect,
  // handleSelectedMenu,
  // selectedInstrument,
  // instruments,
  data,
  // onRowClick,
  cellClassName,
  headerClassName = "",
  // pagination,
  loading,
  // showHeader = true,
  // showFilters = false,
  rowClassName = "",
  // filterClassName = "",
  showAllData = false,
  tableClassName = "",
  TableClassNameEmpty = "",
  // id = "reset-filters",
  // noResultsMessage,
  onSingleClick
}: DataTableProps<TData, TValue>) {
  // const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  // const [filters, setFilters] = useState<Record<string, string>>({})
  // const [showFiltersBool, setShowFiltersBool] = useState<boolean>(true)
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

  // const resetFilters = () => {
  //   setFilters({})
  //   setShowFiltersBool(false)
  //   setTimeout(() => {
  //     setShowFiltersBool(true)
  //   }, 1)
  // }

  // const handleChangePageSize = (size: number) => {
  //   // pagination?.handleItemsPerPageChange(size)
  //   table.setPageSize(size)
  // }
  useEffect(() => {
    if (data.length) {
      table.setPageSize(data.length)
    }
  }, [showAllData, data])
  return (
    <div className={`h-full w-full grid ${data ? 'grid-rows-[max-content_auto_max-content]' : 'grid-rows-[max-content_auto]'} overflow-hidden gap-4`}>
      <div className="flex justify-between">
        <h1 className="text-lg">{title}</h1>
        {rightActions && <div>{rightActions}</div>}
      </div>
      {/* <div className="absolute"><Input type="hidden" onClick={resetFilters} id={id} /></div> */}
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
                  onDoubleClick={() => {
                    // onRowClick && onRowClick(row.original)
                  }}
                  onClick={() => onSingleClick?.(row.original)}
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
              <TableCell colSpan={columns.length} className={`${TableClassNameEmpty ? TableClassNameEmpty : 'h-80 text-center'}`}>
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data &&
        <TablePagination
        // {...pagination}
        // handleChangePageSize={handleChangePageSize}
        />
      }
    </div>
  )
}