import React from "react";
import {
    Table as BaseTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import LoadingSpinner from "@/components/ui/loadingSpinner.tsx";

interface TableColumn {
    label: string; // Display name of the column
    key: string;   // Key from the data item
    sortable?: boolean; // If column is sortable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, item: any) => React.ReactNode; // Custom rendering for the column
}

interface TableProps<T> {
    data: T[]; // Data to be displayed in the table
    columns: TableColumn[]; // Configuration for table columns
    isLoading?: boolean; // Show loading spinner
    sortBy?: string; // Currently sorted column
    onSort?: (key: string) => void; // Function to handle sorting
    actions?: (item: T) => React.ReactNode; // Render custom row actions (optional)
    emptyMessage?: string; // Custom message for no data
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({
                                                                 data,
                                                                 columns,
                                                                 isLoading,
                                                                 sortBy,
                                                                 onSort,
                                                                 actions,
                                                                 emptyMessage = "No data available"
                                                             }: TableProps<T>) => {

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (!sortBy || !onSort) return null;
        if (sortBy.replace("-", "") === columnKey) {
            return !sortBy.includes("-") ? (
                <span className="ml-2">▲</span> // Use a suitable icon for ascending
            ) : (
                <span className="ml-2">▼</span> // Use a suitable icon for descending
            );
        }
        return null;
    };

    return (
        <BaseTable>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={column.key}
                            className={column.sortable && onSort ? "cursor-pointer" : ""}
                            onClick={column.sortable && onSort ? () => onSort(column.key) : undefined}
                        >
                            <div className="flex items-center">
                                {column.label}
                                {column.sortable && <SortIcon columnKey={column.key} />}
                            </div>
                        </TableHead>
                    ))}
                    {actions && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="flex items-center justify-center">
                           <p> <LoadingSpinner/></p>
                        </TableCell>
                    </TableRow>
                ) : data?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    data?.map((item, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>
                                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                                </TableCell>
                            ))}
                            {actions && <TableCell>{actions(item)}</TableCell>}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </BaseTable>
    );
};

export default Table;