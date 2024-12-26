import {
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    Column,
    getExpandedRowModel,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Fragment } from 'react/jsx-runtime'
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from '../lib/icons'
import Button from './ui/button'

interface IProps<TData> {
    title: string
    actions?: Partial<Record<'add' | 'reload', () => void>>
    loading: boolean
    columns: ColumnDef<TData>[]
    renderSubComponent?: (data: TData) => (React.ReactElement | null)
    data: TData[]
}

export default function DataTable<TData>(props: IProps<TData>) {
    const {
        title,
        actions,
        loading,
        columns,
        renderSubComponent,
        data
    } = props
    const table = useReactTable({
        columns,
        data,
        initialState: {
            pagination: {
                pageSize: 50,
            }
        },
        getRowCanExpand: () => true,
        getExpandedRowModel: getExpandedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className={`h-full w-full grid ${loading ? 'grid-rows-[max-content_auto]' : 'grid-rows-[max-content_auto_max-content]'} overflow-hidden gap-4`}>
            <div className="flex justify-between">
                <h1 className="text-lg">{title}</h1>
                {actions &&
                    <div className='flex gap-2'>
                        {
                            actions?.add &&
                            <Button onClick={actions.add}>
                                Agregar
                            </Button>
                        }
                        {actions?.reload &&
                            <Button
                                variant='outline'
                                onClick={() => {
                                    table.resetSorting();
                                    table.resetColumnFilters();
                                    table.toggleAllRowsExpanded(false);
                                    actions.reload!()
                                }}
                            >
                                Recargar
                            </Button>
                        }
                    </div>
                }
            </div>
            <Table className={(loading || !table.getRowModel().rows?.length) ? 'h-full' : ''}>
                <TableHeader className="sticky top-0 border border-primary">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className={`bg-background-secondary default-border`}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} className={"text-primary font-normal text-center"}>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none flex justify-center gap-2'
                                                    : '',
                                                onClick: !header.column.columnDef.meta?.filterType
                                                    ? header.column.getToggleSortingHandler()
                                                    : undefined,
                                            }}
                                        >
                                            {!header.column.columnDef.meta?.filterType
                                                && flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                            {header.column.columnDef.meta?.filterType
                                                && <Filter
                                                    column={header.column}
                                                    placeholder={header.column.columnDef.header?.toString() || ""}
                                                />
                                            }
                                            {(!header.column.id.includes("noArrow"))
                                                && <div onClick={header.column.columnDef.meta?.filterType
                                                    ? header.column.getToggleSortingHandler()
                                                    : undefined}
                                                >
                                                    {{
                                                        asc: <ChevronUpIcon />,
                                                        desc: <ChevronDownIcon />,
                                                    }[header.column.getIsSorted() as string]
                                                        ?? <ChevronsUpDownIcon />
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="overflow-y-auto">
                    {
                        loading ?
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    Cargando...
                                </TableCell>
                            </TableRow> :
                            table.getRowModel().rows?.length ?
                                table.getRowModel().rows.map(row => {
                                    return (
                                        <Fragment key={row.id}>
                                            <TableRow className='border-b border-border'>
                                                {row.getVisibleCells().map(cell => {
                                                    return (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                            {row.getIsExpanded() && (
                                                <TableRow>
                                                    <TableCell colSpan={row.getVisibleCells().length} className='p-0'>
                                                        {renderSubComponent && renderSubComponent(row.original)}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Fragment>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan={columns.length} className={`text-center`}>
                                        Sin resultados
                                    </TableCell>
                                </TableRow>
                    }
                </TableBody>
            </Table>
            {!loading &&
                <div>
                    <div className="flex items-center gap-2">
                        <button
                            className="border rounded p-1"
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount().toLocaleString()}
                            </strong>
                        </span>
                        <span className="flex items-center gap-1">
                            | Go to page:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                        {table.getRowCount().toLocaleString()} Rows
                    </div>
                </div>
            }
        </div >
    )
}

function Filter<TData>({
    column,
    placeholder
}: {
    column: Column<TData>
    placeholder: string
}) {
    const columnFilterValue = column.getFilterValue()
    return (
        <input
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={placeholder}
            className="w-full border shadow rounded"
        />
    )
}
