import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../components/data-table";
import { useEffect, useState } from "react";
import ProductController from "../controllers/product-controller";
import { IProduct } from "../models/api/product";
import { usePreferencesStore } from "../store/preferences";

export default function ProductPage() {
    const setModalData = usePreferencesStore((state) => state.setModalData);
    const [products, setProducts] = useState<IProduct[]>([]);

    const columns: ColumnDef<IProduct>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "description",
            header: "Descripción",
        },
        {
            accessorKey: "location",
            header: "Ubicación",
        }
    ];

    const createProductModal = () => {
        setModalData({
            containerClassName: "w-[90%] lg:w-[700px] text-custom-black",
            children: (
                <div>hola</div>
            ),
        })
    };

    useEffect(() => {
        ProductController.get({
            setProducts
        });
    }, [])

    return (
        <DataTable
            title="Listado de productos"
            rightActions={
                <button
                    className="btn btn-primary"
                    onClick={createProductModal}
                >
                    Agregar producto
                </button>
            }
            columns={columns}
            data={
                // Array.from({ length: 100 }, (_, i) => ({
                //     name: `Producto ${i + 1}`,
                //     description: `Descripción del producto ${i + 1}`,
                //     location: `Ubicación del producto ${i + 1}`
                // }))
                products
            }
        />
    )
}