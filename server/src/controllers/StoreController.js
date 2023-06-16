const { NotFoundError } = require("../core/error.response");
const { Ok } = require("../core/success.response");
const { Store } = require("../models");

class StoreController {
  async getAllStores(req, res) {
    const stores = await Store.findAll();
    if (!stores) throw new NotFoundError("Not found stores!");

    new Ok({
      message: "get list store success!",
      metadata: stores,
    }).send(res);
  }

  async GetStoreById(req, res) {
    const id = req.params.id;
    const store = await Store.findByPk(id);
    new Ok({
      message: "get store success!",
      metadata: store,
    }).send(res);
  }

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
    if (!store) throw new NotFoundError("Create error!");

    new Ok({
      message: "create store success!",
      metadata: store,
    }).send(res);
  }

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
    const store = await Store.findByPk(id);

    if (!store) throw new NotFoundError("Not found store!");

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

    new Ok({
      message: "update store success!",
      metadata: store,
    }).send(res);
  }

  async deleteStore(req, res) {
    const id = req.params.id;
    const store = await Store.findByPk(id);
    if (!store) throw new NotFoundError("Not found store!");

    await store.destroy();
    res.status(200).json({ message: "Store deleted successfully" });
  }
}

module.exports = new StoreController();
