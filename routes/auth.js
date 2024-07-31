const {Router} = require('express');
const { check } = require('express-validator');
const {createUser, loginUser , revalidateToken}= require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();
/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

router.post('/new',
 [//middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6}),
    validarCampos
 ], 
 createUser);

router.post('/',
 [//middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6}),
    validarCampos
 ],
  loginUser);

router.get('/renew',validarJWT, revalidateToken);


module.exports = router;