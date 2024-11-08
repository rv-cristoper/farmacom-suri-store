

import DataTable from '../components/data-table2'
import { ColumnMetaFilterType } from '../enums/columnMetaFilterType.enum'
import { useEffect, useState } from 'react'
import ProductController from '../controllers/product-controller'
import { IProduct } from '../models/api/product'
import { ColumnDef } from '@tanstack/react-table'

export default function ProductPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ProductController.get({
            setProducts,
            setLoading,
        })
    }, [])

    const columns: ColumnDef<IProduct>[] = [
        {
            id: 'expander',
            header: () => null,
            cell: ({ row }) =>
                <button
                    {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
                    }}
                >
                    {row.getIsExpanded() ? '👇' : '👉'}
                </button>
        },
        {
            accessorKey: 'name',
            header: 'Nombre',
            meta: {
                filterType: ColumnMetaFilterType.TEXT,
            }

        },
        {
            accessorKey: 'description',
            header: 'Descripción',
        },
        {
            accessorKey: 'location',
            header: 'Ubicación',
        },
    ]

    return (
        <DataTable
            title='Listado de Productos'
            rightActions={<button>Crear</button>}
            loading={loading}
            columns={columns}
            renderSubComponent={renderSubComponent}
            data={products}
        />
    )
}

const renderSubComponent = (data: IProduct) => {
    return (
        <pre style={{ fontSize: '10px' }}>
            <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
    )
}