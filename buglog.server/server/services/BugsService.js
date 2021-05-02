import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class BugsService {
  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async getAll(query = {}) {
    const data = await dbContext.Bugs.find(query).populate('creator')
    return data
  }

  async findBugById(id) {
    const data = await dbContext.Bugs.findOne({ _id: id }).populate('creator')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async getAllNotesByBugId(id) {
    const data = await dbContext.Notes.find({ bug: id }).populate('creator')
    return data
  }

  async editBug(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, { title: body.title, description: body.description }, { new: true }).populate('creator')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }
}

export const bugsService = new BugsService()
