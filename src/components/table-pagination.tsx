import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../components/ui/pagination";
import SelectMenu from "./select-menu";
import {
    ChevronFirstIcon,
    ChevronLastIcon
} from "../lib/icons";
import { IPagination } from "../hooks/use-pagination";

export default function TablePagination(props: IPagination) {
    const {
        filterPagination,
        handleItemsPerPageChange,
        handlePageChange,
        pageRange,
        totalPages,
    } = props;
    const options: { value: string; label: string }[] = [
        { value: "10", label: "10" },
        { value: "30", label: "30" },
        { value: "50", label: "50" },
    ]
    return (
        <div className="p-2 grid grid-cols-[auto_max-content] bg-custom-white text-black">
            <div className="grid grid-cols-[auto_max-content_auto] gap-2 m-auto items-center text-sm">
                Mostrar
                <SelectMenu
                    options={options.filter((it, i, arr) => {
                        return arr.findIndex(obj2 => (obj2.value === it.value)) === i
                    })}
                    defaultValue={filterPagination.take.toString()}
                    handleChange={(value) => handleItemsPerPageChange(+value)}
                />
                registros por página
            </div>
            <Pagination>
                <PaginationContent className="gap-2">
                    <PaginationItem
                        onClick={() => handlePageChange(1, filterPagination.page !== 1)}
                    >
                        <PaginationLink
                            disabled={filterPagination.page === 1}
                            className={`h-10 w-10 bg-white ${filterPagination.page === 1 ? 'cursor-not-allowed' : ''}`}
                            title='Ir a la primera página'
                        >
                            <ChevronFirstIcon />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                        onClick={() => handlePageChange(filterPagination.page - 1, filterPagination.page !== 1)}
                    >
                        <PaginationPrevious
                            disabled={filterPagination.page === 1}
                            title='Ir a la página anterior'
                            className={`bg-white ${filterPagination.page === 1 ? "cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                    {pageRange.map((page) => (
                        <PaginationItem key={page} onClick={() => handlePageChange(page, true)}>
                            <PaginationLink isActive={page === filterPagination.page} className="h-10 w-10 bg-white">{page}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem
                        onClick={() => handlePageChange(filterPagination.page + 1, filterPagination.page !== totalPages)}
                    >
                        <PaginationNext
                            disabled={filterPagination.page === totalPages}
                            title='Ir a la página siguiente'
                            className={`bg-white ${filterPagination.page === totalPages ? "cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                    <PaginationItem
                        onClick={() => handlePageChange(totalPages, filterPagination.page !== totalPages)}
                    >
                        <PaginationLink
                            disabled={filterPagination.page === totalPages}
                            className={`h-10 w-10 bg-white ${filterPagination.page === totalPages ? 'cursor-not-allowed' : ''}`}
                            title='Ir a la última página'
                        ><ChevronLastIcon />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}