import "dotenv/config";
import express from 'express';
import "./database";
import queryRoutes from './routes/query.route';
import blogRoutes from './routes/blog.route';
import authRoutes from './routes/auth.route';
const server = express();

server.get('/', (req, res) => {
    res.status(200).json({success: true, message: "hurray!! server is on"})
});
server.use(express.json());

server.use('/api/v1/query', queryRoutes);
server.use('/api/v1/blog', blogRoutes);
server.use('/api/v1/auth', authRoutes);

const port = process.env.PORT;
server.listen(port || 3000, () => {
    console.log("Server listening on port " + port);
});