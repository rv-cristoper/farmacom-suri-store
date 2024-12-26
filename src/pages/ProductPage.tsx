

import DataTable from '../components/data-table'
import { ColumnMetaFilterType } from '../enums/columnMetaFilterType.enum'
import { useEffect, useState } from 'react'
import ProductController from '../controllers/product-controller'
import { IProduct } from '../models/api/product'
import { ColumnDef } from '@tanstack/react-table'
import { usePreferencesStore } from '../store/preferences'
import CreateProductModal from '../modules/product/CreateProductModal'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table'
import { ChevronDownIcon, ChevronRightIcon } from '../lib/icons'

export default function ProductPage() {
    const { setModalData } = usePreferencesStore()

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    const columns: ColumnDef<IProduct>[] = [
        {
            accessorKey: 'noArrow',
            header: () => null,
            cell: ({ row }) =>
                <button
                    onClick={row.getToggleExpandedHandler()}
                    className='cursor-pointer'
                >
                    {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </button>
        },
        {
            accessorKey: 'name',
            header: 'Nombre',
            meta: {
                filterType: ColumnMetaFilterType.TEXT,
            },
        },
        {
            accessorKey: 'stocks',
            header: 'Stock total',
            cell: ({ row }) => `${row.original.stocks.reduce((acc, stock) => acc + stock.stock, 0)} unidades`,
        },
        {
            accessorKey: 'location',
            header: 'Ubicación',
        },
        {
            accessorKey: 'sss',
            header: 'Observación',
            cell: () => '-',
        },
        {
            accessorKey: 'isActive',
            header: 'Estado',
            cell: ({ row }) => <p className={`${row.original.isActive ? 'text-green-400' : 'text-red-400'}`}>{row.original.isActive ? 'Activo' : 'Inactivo'}</p>,
        },
        {
            accessorKey: 'noArrow2',
            header: 'Acciones',
        },
    ]

    const getProducts = () => {
        ProductController.get({
            setProducts,
            setLoading,
        })
    }
    function addProduct() {
        setModalData({
            children: <CreateProductModal
                getProducts={getProducts}
            />
        });
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <DataTable
            title='Listado de Productos'
            actions={{
                add: addProduct,
                reload: getProducts,
            }}
            loading={loading}
            columns={columns}
            renderSubComponent={renderSubComponent}
            data={products}
        />
    )
}

const renderSubComponent = (data: IProduct) => {
    if (!data.stocks.length) return null
    return (
        <div className='bg-background p-4 grid grid-cols-[350px_auto] border-b border-border'>
            <div className='text-color-gray mt-2'>
                Detalles del producto: <span className='text-primary'>{data.name}</span>
            </div>
            <Table className='border border-border'>
                <TableHeader>
                    <TableRow className='text-primary border-b border-border'>
                        <TableCell className='p-2 text-center'>Fecha de expiración</TableCell>
                        <TableCell className='p-2 text-center'>Stock</TableCell>
                        <TableCell className='p-2 text-center'>Acciones</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.stocks.map((stock, index) => (
                        <TableRow key={index} className='text-color-gray border-b border-border'>
                            <TableCell className='p-2'>{stock.expirationDate.toString()}</TableCell>
                            <TableCell className='p-2'>{stock.stock} unidades</TableCell>
                            <TableCell className='p-2'>.</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}