<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Activated</th>
        <th scope="col">Expiration Date</th>
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
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modal fade" v-for="robot in robots" :id="'editModal-' + robot.id" tabindex="-1" :aria-labelledby="'editModalLabel-' + robot.id" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title fs-5" :id="'editModalLabel-' + robot.id">Edit Robot Account: {{ robot.name }}</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="'Close ' + robot.name"></button>
        </div>
        <div class="modal-body">
          Edit Description:
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
