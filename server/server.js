// import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));


var originWhitelist = ['http://localhost:3000']; //react dashboard URL

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true // Corrected property name
}

app.use(cors(corsOptions));

app.use('/', userRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));