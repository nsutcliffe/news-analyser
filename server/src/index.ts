import express from 'express';
import newsRouter from './routes/news'
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/news', newsRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});