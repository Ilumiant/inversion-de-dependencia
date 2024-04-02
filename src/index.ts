import express from 'express';
import userRoute from './routes/user.route';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoute);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
