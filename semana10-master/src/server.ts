import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.post('/api/calcular-nota', (req, res) => {
  const { alumno, codigoEstudiante, nota1, nota2, nota3, examenParcial, examenFinal } = req.body;

  const n1 = Number(nota1) || 0;
  const n2 = Number(nota2) || 0;
  const n3 = Number(nota3) || 0;
  const parcial = Number(examenParcial) || 0;
  const final = Number(examenFinal) || 0;

  const promedioPracticas = (n1 + n2 + n3) / 3;
  const notaFinal = promedioPracticas * 0.30 + parcial * 0.30 + final * 0.40;
  const aprobado = notaFinal >= 13;

  let observacion: string;
  if (notaFinal >= 17) {
    observacion = 'EXCELENTE';
  } else if (notaFinal >= 13) {
    observacion = 'REGULAR';
  } else {
    observacion = 'RIESGO';
  }

  res.json({ alumno, codigoEstudiante, promedioPracticas, notaFinal, aprobado, observacion });
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
