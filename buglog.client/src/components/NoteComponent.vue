<template>
  <div class="note">
    {{ state.notes }}
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/ListsService'
export default {
  name: 'Note',

  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.boards),
      notes: computed(() => AppState.lists)
    })

    onMounted(async() => {
      try {
        await notesService.getAllNotesByBugId(route.params.id)
      } catch (error) {
        Notification.toast('connot get all notes by bugId', 'error')
      }
    })
    return {
      state,
      route
      // async deleteNote() {
      //   try {
      //     await notesService.deleteNote(props.noteProp.id)
      //     Notification.toast('Note Deleted')
      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
      // }
    }
  }
}
</script>

<style>

</style>
