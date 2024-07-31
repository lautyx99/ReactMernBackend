const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos}= require('../middlewares/validar-campos');
const {getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const {check} = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();



//Todas tienen que pasar por la validacion JWT
router.use(validarJWT);

//Obtener eventos

router.get('/', getEventos);

router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports= router;