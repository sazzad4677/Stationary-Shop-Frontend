import React, {useState, useEffect} from "react";
import {
    Table as BaseTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import LoadingSpinner from "@/components/ui/loadingSpinner.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useDebounce} from "@/hooks/useDebounce"; // Import debounce hook

// Define TableColumn for dynamic column configuration
interface TableColumn {
    label: string; // Display name of the column
    key: string; // Data key that maps to the column
    sortable?: boolean; // If column is sortable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, item: any) => React.ReactNode; // Custom render logic for cells
}

interface TableProps<T> {
    data: T[]; // Data to display in the table
    columns: TableColumn[]; // Column configuration
    isLoading?: boolean; // Spinner state
    actions?: (item: T) => React.ReactNode; // Custom row actions
    emptyMessage?: string; // Message when no data available
    initialLimit?: number; // Initial rows per page
    onQueryChange?: (query: Record<string, unknown>) => void; // Callback for custom query updates
    totalEntries?: number; // Total data rows for pagination
    allowSearch?: boolean; // Enable/disable search bar
    allowPagination?: boolean; // Enable/disable pagination
    allowSorting?: boolean; // Enable/disable sorting
    debounceDelay?: number; // Delay for debounce in ms (default: 300ms)
    height?: string; // Table Height
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({
                                                  data,
                                                  columns,
                                                  isLoading,
                                                  actions,
                                                  emptyMessage = "No data available",
                                                  initialLimit = 10,
                                                  onQueryChange,
                                                  totalEntries,
                                                  allowSearch = true,
                                                  allowPagination = true,
                                                  allowSorting = true,
                                                  debounceDelay = 300, // Default debounce delay
                                                  height
                                              }: TableProps<T>) => {
    // Internal state for search, sorting, pagination
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(initialLimit);

    useEffect(() => {
        if (onQueryChange) {
            onQueryChange({
                search: debouncedSearchTerm,
                sortBy,
                page: currentPage,
                limit,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, sortBy, currentPage, limit]);

    const handleSort = (key: string) => {
        if (!allowSorting) return;
        setSortBy((prev) => (prev === key ? `-${key}` : key));
    };

    const SortIcon = ({columnKey}: { columnKey: string }) => {
        if (!sortBy) return null;
        if (sortBy.replace("-", "") === columnKey) {
            return sortBy.startsWith("-") ? <span className="ml-2">▼</span> : <span className="ml-2">▲</span>;
        }
        return null;
    };

    const startingIndex = (currentPage - 1) * limit + 1;
    const endingIndex = Math.min(currentPage * limit, totalEntries || 0);

    // Utility function to get nested object values
    const getNestedValue = (obj: T, path: string) => {
        if (!obj || !path) return null;
        return path.split(".").reduce((value, key) => (value && value[key] !== undefined ? value[key] : null), obj);
    };

    return (
        <div>
            {/* Search and Pagination Controls */}
            <div className="mb-4 flex justify-between items-center">
                {allowSearch && (
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                )}

                {allowPagination && (
                    <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Rows per page"/>
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 50, 100].map((item, key) => (
                                <SelectItem key={key} value={item.toString()}>
                                    {item} per page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Table Content */}
            <ScrollArea className={`h-[${height || "500px"}]`}>
                <BaseTable>
                    <TableHeader className="sticky -top-1 bg-background z-10">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={column.sortable && allowSorting ? "cursor-pointer" : ""}
                                    onClick={column.sortable && allowSorting ? () => handleSort(column.key) : undefined}
                                >
                                    <div className="flex items-center">
                                        {column.label}
                                        {column.sortable && <SortIcon columnKey={column.key}/>}
                                    </div>
                                </TableHead>
                            ))}
                            {actions && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                                    <LoadingSpinner/>
                                </TableCell>
                            </TableRow>
                        ) : data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            {column.render
                                                ? (column.render(getNestedValue(item, column.key), item) as React.ReactNode)
                                                : (getNestedValue(item, column.key) as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                    {actions && <TableCell>{actions(item)}</TableCell>}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </BaseTable>
                <ScrollBar orientation="horizontal"/>
                <ScrollBar orientation="vertical"/>
            </ScrollArea>

            {/* Pagination Controls */}
            {allowPagination && (
                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {startingIndex} to {endingIndex} of {totalEntries || 0} entries
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage * limit >= (totalEntries || 0)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;