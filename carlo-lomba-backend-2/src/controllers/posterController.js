const { response } = require('express');
const PosterModel = require('../models/posterModel');
const ResponsesModel = require('../models/responsesModel');

class PosterController {
  static async createPoster(req, res) {
    try {
      const data = req.body;
      const posterId = await PosterModel.create(data);
      res.status(201).json({message: 'Poster created successfully',data:posterId });
    } catch (error) {
      console.error('Error creating poster:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async readAllPosters(req, res) {
    try {
      const posters = await PosterModel.readAll();

      res.status(200).json(posters);
    } catch (error) {
      console.error('Error reading all posters:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async readPosterById(req, res) {
    try {
      const id = req.params.id;
      const poster = await PosterModel.readById(id);
      if (!poster) {
        throw new Error(`poster with id ${id} not found`);
      }
      res.status(200).json(poster);
    } catch (error) {
      console.error('Error reading poster by id:', error);
      res.status(404).json({ message: error.message });
    }
  }
static async updatePosterById(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const updating = await PosterModel.readById(id); // FIX: add await
    if (!updating) {
      throw new Error(`poster with id ${id} not found`);
    }

    const payload = {
      image_url: data.image_url ?? updating.image_url,
      poster_name: data.poster_name ?? updating.poster_name,
      pembuat: data.pembuat ?? updating.pembuat,
      votes: data.votes ?? updating.votes,
      description: data.description ?? updating.description
    };

    const updated = await PosterModel.updateById(id, payload);
    if (!updated) {
      throw new Error(`ERROR UPDATING POSTER`);
    }

    res.status(200).json({ message: 'Poster updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating poster by id:', error);
    res.status(404).json({ message: error.message });
  }
}

static async updateVoting(req, res) {
  try {
    const id = req.params.id;
    const updating = await PosterModel.updateVoting(id);
    if (!updating) {
      throw new Error(`poster with id ${id} not found`);
    }

    res.status(200).json({ message: 'Poster updated successfully', data: updating });
  } catch (error) {
    console.error('Error updating poster by id:', error);
    res.status(404).json({ message: error.message });
  }
}


  static async deletePosterById(req, res) {
    try {
      const id = req.params.id;
      const deleted = await PosterModel.deleteById(id);
      if (!deleted) {
        throw new Error(`poster with id ${id} not found`);
      }
      res.status(204).json({ id });
    } catch (error) {
      console.error('Error deleting poster by id:', error);
      res.status(404).json({ message: error.message });
    }
  }

 
}
module.exports = PosterController;
