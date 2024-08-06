import express from 'express'
import mongoose from 'mongoose';
import chalk from 'chalk';
import studentRouter from './routers/student.router.js'
import cookieParser from 'cookie-parser';
import env from 'dotenv'
env.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/student', studentRouter);

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(chalk.green.inverse("Db is connected successfully."));
    }).catch((err)=>{
        console.log(chalk.red.inverse("Db connection failed..."));
    })
}

app.listen(process.env.PORT, (err)=>{
    dbConnection();
    console.log(chalk.yellow.inverse("Server is live"))
});
