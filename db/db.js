
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});
const stringConection = "mongodb+srv://GustavoReactTeam:admin1234@salessystem.3zhvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const conectionDB = (callback)=>{
    client.connect((err, db) => {
        if (err) {
          console.error('Error al conectar a la BD');
          return 'error';
        }
        conexion = db.db('concesionario');
        console.log('Conexión exitosa');
        return callback;
      });
}

const getDB = () => {
    return conexion;
}

export { conectionDB, getDB };