import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { ColumnMetaFilterType } from "./enums/columnMetaFilterType.enum";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: ColumnMetaFilterType;
  }
}
