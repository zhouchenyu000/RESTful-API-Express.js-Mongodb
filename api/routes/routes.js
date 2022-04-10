const express = require('express');
const Routes = express.Router();

const controller = require('../controller/controller');

Routes.route('/listings').get(controller.list_all_data)
Routes.route('/listings/insert').post(controller.insert_data)
Routes.route('/listings/update/:id').put(controller.update_data)
Routes.route('/listings/delete/:id').delete(controller.delete_data)


module.exports = Routes;
