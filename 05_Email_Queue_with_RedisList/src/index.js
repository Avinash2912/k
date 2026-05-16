import express from 'express';
import Redis from 'ioredis';

const app = express();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
app.use(express.json());















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});