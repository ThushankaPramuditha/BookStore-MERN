import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
//Middleware for parsing request Body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: [],
// }));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('WElcome to MERN app');
});

app.use('/books', booksRoute);


mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
})
.catch((error) => {
    console.log('Error in connecting to MongoDB', error);
});
