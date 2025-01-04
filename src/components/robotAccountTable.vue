<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Activated</th>
        <th scope="col">Expiration Date</th>
        <th scope="col">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">New</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="robot in robots" :key="robot.id">
        <td>{{ robot.id }}</td>
        <td>{{ robot.name }}</td>
        <td>{{ robot.description }}</td>
        <td>{{ !robot.disable }}</td>
        <td>{{ robot.expires_at ? new Date(robot.expires_at * 1000).toDateString() : 'N/A' }}</td>
        <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal-' + robot.id">
            Edit
          </button>
          <editRobotAccount :robot="robot"/>
        </td>
      </tr>
    </tbody>
  </table>

  <createAccount/>
</template>

<script setup lang="ts">
import editRobotAccount from './editRobotAccount.vue';
import createAccount from './createAccount.vue';
import { GetRobots } from '@/utils/requests';
import type { Robot } from '../../env';
import { onMounted, ref } from 'vue';

const robots = ref<Robot[]>([])

async function fetchRobots() {
  try {
    robots.value = await GetRobots()
  } catch (error) {
      console.error("error:", error);
  }
}

onMounted(() => {
  fetchRobots()
})
</script>
