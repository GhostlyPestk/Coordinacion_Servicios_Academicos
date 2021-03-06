const CuerpoAcademico = require('../Models/CA.model');
const catchAsync = require('../Helpers/catchAsync');
const AppError = require('../Helpers/appError');

module.exports.postCuerpoAcademico = catchAsync(async (req, res, next) => {
  console.log('is here');
  const resp2 = await CuerpoAcademico.findOne({ clave: req.body.clave });
  if (!resp2) {
    const { clave } = req.body;
    const anio = req.body.anio_creacion;
    const { duracion } = req.body;
    const { nivel } = req.body;
    const { nombre } = req.body;
    console.log(req.body);
    const objCA = new CuerpoAcademico({
      clave: clave,
      anio_creacion: anio,
      duracion: duracion,
      nivel: nivel,
      nombre: nombre
    });
    const resp = await objCA.save();
    if (!resp) {
      return next(
        new AppError('Ocurrio un error al guardar el documento', 500)
      );
    }
    res.status(200).json({ ok: true, resp });
  } else {
    return next(new AppError('Este Cuerpo Academico ya existe', 400));
  }
});

module.exports.putCuerpoAcademico = catchAsync(async (req, res, next) => {
  const query = { clave: req.params.id };
  const { clave } = req.body;
  const anio = req.body.anio_creacion;
  const { duracion } = req.body;
  const { nivel } = req.body;
  const { nombre } = req.body;
  const resp = await CuerpoAcademico.findOne(query);
  if (!resp) {
    return next(new AppError('No se encuentra el documento en la BD', 400));
  }
  resp.clave = clave;
  resp.anio = anio;
  resp.duracion = duracion;
  resp.nivel = nivel;
  resp.nombre = nombre;
  const CA = await resp.save();
  if (!CA) {
    return next(new AppError('Ocurrio un error al guardar el documento', 500));
  }
  res.status(200).json({ ok: true, CA });
});

module.exports.getCuerposAcademicos = catchAsync(async (req, res, next) => {
  //Populate indica que se llenara los datos de integrantes con la referencia del trabajador
  const resp = await CuerpoAcademico.find()
    .select('-expediente_digitalizado -dictamen_digitalizado')
    .populate('integrantes.integrante', '-nip');
  if (!resp) {
    return next(new AppError('No se encuentra el documento en la BD', 400));
  }
  res.status(200).json({ ok: true, resp });
});

module.exports.getCuerpoAcademico = catchAsync(async (req, res, next) => {
  //Populate indica que se llenara los datos de integrantes con la referencia del trabajador
  const codigo = req.params.id;
  const resp = await CuerpoAcademico.findOne({ clave: codigo }).populate(
    'integrantes.integrante',
    '-nip'
  );
  if (!resp) {
    return next(new AppError('No se encuentra el documento en la BD', 400));
  }
  res.status(200).json({ ok: true, resp });
});

module.exports.notificacionCA = catchAsync(async(req,res,next)=>{
  const trabajador = await Trabajador.findOne({codigo: req.body.id});
        if(!trabajador)
            {
            return next(
              new AppError('No se existe el trabajador', 400)
            );
          }
        const CA = await CuerpoAcademico.findOne({integrantes: {$in: trabajador._id}});
        if(!CA)
            {
            return next(
              new AppError('El trabajador no se encuentra inscrito en un Cuerpo Academico', 400)
            );
          }
    const fi = CA.anio_creacion;
      const inicio = new Date(fi);
      const today = new Date();
      const year = inicio.getFullYear() + CA.duracion_anios;
      const month = inicio.getMonth() - 6;
      const day = inicio.getDate();
      const fin = new Date(`${year}-${month}-${day}`);
      if (today >= fin)
      {
        return res.status(200).json({ok: true, apuntoVencer: true});
      }
      else
        return res.status(200).json({ok: true, apuntoVencer: false})
});
