<template>
  <div class="api-table">
    <table>
      <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, i) in data" :key="i">
        <td v-for="(cell, j) in row" :key="j" v-html="cell"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  columns: Array,
  data: Array
})
</script>

<style scoped>
table{
  width: 100%;
}
.api-table {
  width: 100%;
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.api-table th {
  background: #3b82f6;
  color: white;
  padding: 14px 20px;
  font-weight: 500;
}
.api-table td {
  padding: 12px 20px;
  border-bottom: 1px solid #e2e8f0;
}
.api-table tr:last-child td {
  border-bottom: none;
}
</style>