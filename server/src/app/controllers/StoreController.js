const Store = require("../models/store");

// const validateCourse = (course) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//   });

//   return schema.validate(course);
// };

class StoreController {
  // Get all stores
  async getAllStores(req, res) {
    try {
      const stores = await Store.findAll();
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a store by id
  async GetStoreById(req, res) {
    const id = req.params.id;
    try {
      const store = await Store.findByPk(id);
      if (store === null) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.status(200).json(store);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new store
  async createStore(req, res) {
    const {
      location,
      name,
      phone,
      email,
      manager,
      img,
      map_img,
      duration,
      on_day,
    } = req.body;
    try {
      const store = await Store.create({
        location,
        name,
        phone,
        email,
        manager,
        img,
        map_img,
        duration,
        on_day,
      });
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a store by id
  async updateStore(req, res) {
    const id = req.params.id;
    const {
      location,
      name,
      phone,
      email,
      manager,
      img,
      map_img,
      duration,
      on_day,
    } = req.body;
    try {
      const store = await Store.findByPk(id);
      if (store === null) {
        res.status(404).json({ message: "Store not found" });
      } else {
        await store.update({
          location,
          name,
          phone,
          email,
          manager,
          img,
          map_img,
          duration,
          on_day,
        });
        res.status(200).json(store);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a store by id
  async deleteStore(req, res) {
    const id = req.params.id;
    try {
      const store = await Store.findByPk(id);
      if (store === null) {
        res.status(404).json({ message: "Store not found" });
      } else {
        await store.destroy();
        res.status(200).json({ message: "Store deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new StoreController();
