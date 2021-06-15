const regressionTree = require('wink-regression-tree');
const pTrain = require('../Files/temp/prodep.json');
const Trabajador = require('../Models/trabajador.model');
const catchAsync = require('../Helpers/catchAsync');
const AppError = require('../Helpers/appError');

module.exports.crearProdep = catchAsync(async (req, res, next) => {
  const worker = await Trabajador.findOne({ codigo: req.params.codigo });
  for (let i = 0; i < worker.prodep.length; i++) {
    const fi = worker.prodep[i].fecha_recibido;
    const inicio = new Date(fi);
    const today = new Date();
    const year = inicio.getFullYear() + worker.prodep[i].duracion_anios;
    const month = inicio.getMonth() + 1;
    const day = inicio.getDate();
    const fin = new Date(`${year}-${month}-${day}`);
    if (today < fin) {
      return next(new AppError('Existe un perfil vigente de Prodep', 400));
    }
  }
  const { fecha } = req.body;
  const anio = req.body.duracion;
  const { monto } = req.body;
  const prod = {
    fecha_recibido: fecha,
    duracion_anios: anio,
    monto_economico: monto
  };
  const pr = await Trabajador.findOneAndUpdate(
    { codigo: req.params.codigo },
    { $push: { prodep: prod } }
  );
  const prodep = pr.prodep[pr.prodep.length - 1];
  res.status(200).json({ ok: true, prodep });
});

module.exports.actualizarProdep = catchAsync(async (req, res, next) => {
  const query = { codigo: req.params.codigo };
  const { fecha } = req.body;
  const anio = req.body.duracion;
  const { monto } = req.body;
  const worker = await Trabajador.findOne(query);
  if (!worker) {
    return next(new AppError('No se encuentra el trabajador en la BD', 400));
  }
  const last = worker.prodep[worker.prodep.length - 1];
  const fi = last.fecha_recibido;
  const inicio = new Date(fi);
  const today = new Date();
  const year = inicio.getFullYear() + last.duracion_anios;
  const month = inicio.getMonth() + 1;
  const day = inicio.getDate() + 15;
  const fin = new Date(`${year}-${month}-${day}`);
  if (today > fin) {
    return next(new AppError('Perfil prodep no esta vigente', 400));
  }
  const recent = worker.prodep.length - 1;
  worker.prodep[recent].fecha_recibido = fecha;
  worker.prodep[recent].duracion_anios = anio;
  worker.prodep[recent].monto_economico = monto;
  await worker.save();
  const prodep = worker.prodep[recent];
  return res.status(200).json({ ok: true, prodep });
});

module.exports.verProdep = catchAsync(async (req, res, next) => {
  const query = { codigo: req.params.codigo };
  const worker = await Trabajador.findOne(query);
  if (!worker) {
    return next(new AppError('No se encontro al trabajador', 400));
  }
  const { prodep } = worker;
  res.status(200).json({ ok: true, prodep });
});

module.exports.treeProdep = catchAsync(async (req, res, next) => {
  const prod = {
    fecha_recibido: req.body.fecha,
    duracion_anios: req.body.duracion
  };
  const rt = regressionTree();
  const columnas = [
    { name: 'fecha_recibido', categorical: true, exclude: false },
    { name: 'duracion_anios', categorical: true, exclude: false },
    { name: 'monto_economico', categorical: false, target: true }
  ];
  const treeParams = {
    minPercentVarianceReduction: 0.5,
    minLeafNodeItems: 10,
    minSplitCandidateItems: 30,
    minAvgChildrenItems: 2
  };
  rt.defineConfig(columnas, treeParams);
  for (i in pTrain.prodep) {
    rt.ingest(pTrain.prodep[i]);
  }
  console.log(rt.learn());
  const mean = rt.predict(prod);
  console.log(+mean.toFixed(1));
  res.status(200).json({ ok: true, mean });
});

module.exports.notificacionP = catchAsync(async(req,res,next)=>{
  const trabajador = await Trabajador.findOne({codigo: req.body.id});

        if(!trabajador)
            {
            return next(
              new AppError('No se existe el trabajador', 400)
            );
          }
    for (let i = 0; i < trabajador.prodep.length; i++) {
      const fi = trabajador.prodep[i].fecha_recibido;
      const inicio = new Date(fi);
      const today = new Date();
      const year = inicio.getFullYear() + trabajador.prodep[i].duracion_anios;
      const month = inicio.getMonth() - 6;
      const day = inicio.getDate();
      const fin = new Date(`${year}-${month}-${day}`);
      if (today < fin)
      {
        return res.status(200).json({ok: true, apuntoVencer: true});
      }
      else
        return res.status(200).json({ok: true, apuntoVencer: false});
    }
      
});
