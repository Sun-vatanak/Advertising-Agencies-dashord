<script lang="ts">
import { z } from "zod"

/* Table schema */
export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})
</script>

<script setup lang="ts">
import { ref, h } from "vue"
import { DragDropProvider } from "dnd-kit-vue"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  useVueTable,
  getCoreRowModel,
  type ColumnDef,
} from "@tanstack/vue-table"

/* Data */
type RowData = {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
}

const data = ref<RowData[]>([
  {
    id: 1,
    header: "Campaign A",
    type: "Ads",
    status: "Active",
    target: "USA",
    limit: "$5,000",
    reviewer: "John",
  },
  {
    id: 2,
    header: "Campaign B",
    type: "SEO",
    status: "Paused",
    target: "EU",
    limit: "$2,000",
    reviewer: "Anna",
  },
])

/* Columns */
const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "header",
    header: "Header",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
  },
]

/* Table instance */
const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <DragDropProvider :modifiers="[restrictToVerticalAxis]">
    <table class="table">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            {{ header.column.columnDef.header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            {{ cell.getValue() }}
          </td>
        </tr>
      </tbody>
    </table>
  </DragDropProvider>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>