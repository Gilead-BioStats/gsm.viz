//import { useState, useMemo } from 'react';
//import { getCoreRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table';
//
//export default function defineTable(data, columns) {
//    const [sorting, setSorting] = useState([]);
//
//    const table = useReactTable({
//        data: useMemo(() => makeSiteSummaryData(data), []),
//        columns,
//        getCoreRowModel: getCoreRowModel(),
//        getSortedRowModel: getSortedRowModel(),
//        state: {
//            sorting: sorting,
//        },
//        onSortingChange: setSorting,
//    });
//
//    return(table);
//}
