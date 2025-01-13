<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Activated</th>
        <th scope="col">Created At</th>
        <th scope="col">Expires</th>
        <th scope="col">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">New</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="robot in robots" :key="robot.id">
        <td>{{ robot.id }}</td>
        <td>{{ sanitizeRobotName(robot.name) }}</td>
        <td>{{ robot.description }}</td>
        <td>{{ !robot.disable }}</td>
        <td>{{ robot.creation_time ? new Date(robot.creation_time).toDateString() : "N/A" }}</td>
        <td v-if="robot.duration == -1">Never</td>
        <td v-else>{{ dateFromExpiresAt(robot.expires_at) }}</td>
        <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal-' + robot.id">
            Edit
          </button>
          <editRobotAccount :robot="robot" @accountsUpdated="handleAccountsUpdated"/>
        </td>
      </tr>
    </tbody>
  </table>
  <createAccount @accountCreated="handleAccountsUpdated"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import editRobotAccount from './editRobotAccount.vue';
import createAccount from './createAccount.vue';
import { GetRobots } from '@/utils/requests';
import type { Robot } from '../../env';
import { dateFromExpiresAt, sanitizeRobotName } from '@/utils/utils';

const robots = ref<Robot[]>([]);

async function fetchRobots() {
  try {
    robots.value = await GetRobots();
  } catch (error) {
    console.error("Error fetching robots:", error);
  }
}

async function handleAccountsUpdated() {
  // Add a small delay to ensure all modal cleanup is complete
  setTimeout(fetchRobots, 200);
}

onMounted(() => {
  fetchRobots();
});
</script>
