"use client"

import React from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (limit: number) => void
}

const DOTS = "..."

const PaginationButton: React.FC<{
    page: number | string
    isActive?: boolean
    onClick: () => void
}> = ({page, isActive, onClick}) => (
    <PaginationItem>
        <PaginationLink>
            <Button variant={isActive ? "default" : "outline"} onClick={onClick}>
                {page}
            </Button>
        </PaginationLink>
    </PaginationItem>
)

export function DynamicPagination({
                                      currentPage,
                                      totalItems,
                                      itemsPerPage,
                                      onPageChange,
                                      onItemsPerPageChange,
                                  }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const pageNumbers = React.useMemo(() => {
        const pages = []
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, DOTS, totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, DOTS, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPages)
            }
        }
        return pages
    }, [currentPage, totalPages])
    return (
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center space-x-4  md:space-y-0">
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage > 1) onPageChange(currentPage - 1)
                                }}
                            />
                        </PaginationItem>
                        {pageNumbers.map((pageNumber, index) =>
                            pageNumber === DOTS ? (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            ) : (
                                <PaginationButton
                                    key={index}
                                    page={pageNumber as number}
                                    isActive={pageNumber === currentPage}
                                    onClick={() => onPageChange(pageNumber as number)}
                                />
                            ),
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage < totalPages) onPageChange(currentPage + 1)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Items per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder={itemsPerPage}/>
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 40, 50].map((limit) => (
                            <SelectItem key={limit} value={limit.toString()}>
                                {limit}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

