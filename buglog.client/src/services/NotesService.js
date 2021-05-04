import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
// import router from '../router'

class NotesService {
  async getAllNotes() {
    const res = await api.get('api/notes')
    AppState.notes = res.data
    logger.log(AppState.notes)
  }

  async getAllNotessByBugId(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
    logger.log(AppState.notes)
  }

  async createNote(newNote) {
    try {
      await api.post('api/notes/', newNote)
      this.getAllNotesByBugId(newNote.bugId)
      Notification.toast('Bug Created', 'success')
    } catch (error) {
      Notification.toast('Error', 'warning')
    }
  }

  async deleteList(id) {
    try {
      await api.delete('api/notes/' + id)
      AppState.notes = AppState.notes.filter(note => note.id !== id)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}
export const notesService = new NotesService()
