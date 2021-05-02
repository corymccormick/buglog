import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(id) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Comment'
  }
}

export const notesService = new NotesService()
