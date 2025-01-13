<template>
  <h1 class="text-center fw-bold mb-3">Robot Accounts</h1>
  <robotAccountTable/>
  <footer class="mt-3 text-center">To logout simply close this tab, credentials are not persisted.</footer>
</template>

<script setup lang="ts">
import robotAccountTable from '@/components/robotAccountTable.vue';
</script>
