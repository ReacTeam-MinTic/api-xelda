import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import Cors from "cors";

dotenv.config({path: './.env'});
const stringConection = process.env.DATABASE_URL;
  
const client = new MongoClient(stringConection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = Express();
app.use(Express.json());

app.use(Cors());

app.patch('/editar/usuarios', (req, res) => {
  
  const edit = req.body;
  const filterUser = { _id: new ObjectId(edit.id) };
  delete edit.id;
  const operation = {
    $set: edit,
  };
  conexion
    .collection("users")
    .findOneAndUpdate(
      filterUser,
      operation,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el usuario", err);
          res.sendStatus(500);
        } else {
          console.log("Actualización exitosa");
          res.sendStatus(200);
        }
      }
    );
});

app.get("/users", (req, res) => {
  console.log(
    "Esta es la función que se ejecuta cuando se llama a la ruta /users"
  );
  conexion
    .collection("users")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).send("Error consultando usuarios");
      } else {
        res.json(result);
      }
    });
});

app.post("/usuario/nuevo", (req, res) => {
  const datesUsers = req.body;
  try {
    if (
      Object.keys(datesUsers).includes("name") &&
      Object.keys(datesUsers).includes("lastname") &&
      Object.keys(datesUsers).includes("state") &&
      Object.keys(datesUsers).includes("role") &&
      Object.keys(datesUsers).includes("email")
    ) {
      conexion.collection("users").insertOne(datesUsers, (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
  console.log(req.body);
  res.send("Vehículo creado");
});

app.delete("/eliminar/usuarios", (req, res) => {
  const filterUser = { _id: new ObjectId(req.body._id) };
  conexion.collection("users").deleteOne(filterUser, (err, result) => {
    if (err) {
      console.error("Error al eliminar el usuasio", err);
      res.sendStatus(500);
    } else {
      console.log("Eliminación exitosa");
      res.sendStatus(200);
    }
  });
});

let conexion;
const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error al conectar a la base de datos");
      return "error";
    }
    conexion = db.db("concesionario");
    console.log("Conexión exitosa");
    return app.listen(process.env.PORT, () => {
      console.log(`Escuchando al puerto: ${process.env.PORT}`);
    });
  });
};

main();
