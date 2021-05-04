<template>
  <div class="bugDetails container-fluid" v-if="state.bugs.id">
    <div class="row">
      <div class="col-md-8 ml-2">
        title: <span class="titlesize"> {{ state.bugs.title }}</span> <br>
      </div>
      <div :class="{'closed-color': state.bugs.closed} ">
        status: {{ state.bugs.closed ? 'closed': 'open' }}
      </div>
      <div class="col-md-4 ml-2">
        <img :src="state.bugs.creator.picture" alt=""><br>created by: {{ state.bugs.creator.name }}
      </div>
    </div>
    <div class="row  ml-2">
      <div class="col-6 mt-3 mb-5 card">
        <p>
          {{ state.bugs.description }}
        </p>
      </div>
    </div>
    <span>Notes Go Here</span>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bugs: computed(() => AppState.activeBug)
    })

    onMounted(async() => {
      try {
        await bugsService.getBug(route.params.id)
      } catch (error) {
        console.error('Can Not getBug')
      }
    })
    return {
      state
    }
  }
}
</script>

<style>
.titlesize{
  font-size: 40px;
}
.closed-color{
  color: red;

}

</style>
