<template>
  <input type="text" class="form-control mb-3" placeholder="Search for an account by name..." v-model="searchedName">
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
          <editRobotAccount :robot="robot" @accountsUpdated="fetchRobots"/>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center gap-3">
    <button class="btn btn-primary" :disabled="onFirstPage" @click="currentPage--">
      Previous
    </button>
    <button v-for="page in totalPages" :key="page" :class="[ 'btn', (page == currentPage) ? 'btn-primary' : 'btn-secondary' ]" @click="currentPage = page">
      <span>{{ page }}</span>
    </button>
    <button class="btn btn-primary" :disabled="onLastPage" @click="currentPage++">
      Next
    </button>
  </div>

  <createAccount @accountCreated="fetchRobots"/>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import editRobotAccount from './editRobotAccount.vue';
import createAccount from './createAccount.vue';
import { GetRobots } from '@/utils/requests';
import type { Robot } from '../../env';
import { dateFromExpiresAt, sanitizeRobotName } from '@/utils/utils';
import { computed } from 'vue';
const totalCount = ref<number>(0)
const currentPage = ref<number>(1)
const perPage = ref<number>(10)
const robots = ref<Robot[]>([]);
const searchedName = ref<string>('')

const totalPages = computed(() => {
  return Math.ceil(totalCount.value / perPage.value)
})
const onFirstPage = computed(() => {
  return currentPage.value <= 1
})
const onLastPage = computed(() => {
  return currentPage.value >= totalPages.value
})

async function fetchRobots() {
  try {
    const result = await GetRobots(currentPage.value, perPage.value, searchedName.value);
    robots.value = result.robots
    totalCount.value = result.totalCount
  } catch (error) {
    console.error("Error fetching robots:", error);
  }
}

watch([currentPage, searchedName], async () => {
  await fetchRobots()
})

onMounted(() => {
  fetchRobots()
});
</script>
