const express = require('express');
const { detailProject, formProject,addIndividual, formIndividual, detailUser,favorites, eliminate, edit, updateProject, addProject, showAplications} = require('../controllers/productsController');
const upload = require('../middleware/upload');
const checkRol = require('../middleware/checkRol');
const router = express.Router();

// /productos
//.post('/editar/:id?', upload.array('image', 5), updateProduct) // Cambiado a upload.array para permitir varios archivos
//.post('/agregar', upload.array('image', 5), addPost) // Cambiado a upload.array para permitir varios archivos
router
  .get('/detalleProyecto/:id', detailProject)
  .get('/agregarProyecto',checkRol.logged, formProject)
  .post('/agregarProyecto', addProject)
  .put('/agregarProyecto', addProject)
  .get('/agregarIndividual/:id',checkRol.logged, formIndividual)
  .post('/agregarIndividual/:id', addIndividual)
  .get('/detalle/:id',detailUser)
  .delete('/eliminar/:id', eliminate) //ruta que elimina el proyecto creado
  .get('/editar/:id',checkRol.logged, edit)
  .put('/actualizar/:id', updateProject)
  .get('/aplicaciones',checkRol.freelancer, showAplications)
  .get('/guardados',checkRol.freelancer, favorites)
module.exports = router;
