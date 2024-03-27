<script setup lang="ts">
import { data as rules } from "./rule-overview.data";
</script>

<template>
  <div class="rule-table-container">
    <div>✅ - Recommended</div>

    <table>
      <tr>
        <th>Rule</th>
        <th></th>
      </tr>

      <tr v-for="{ name, link, recommended } of rules">
        <td>
          <a :href="link">{{ name }}</a>
        </td>

        <td v-if="recommended">✅</td>
        <td v-else></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.rule-table-container {
  margin-top: 24px;
}

table {
  width: 100%;
  display: table;
}

td:last-of-type {
  width: 50px;
}
</style>
./rule-overview.data.mjs
