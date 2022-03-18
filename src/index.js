import app from './app';
import 'dotenv/config';

const port = process.env.PORT;
app.listen(port || 3000, () => {
    console.log("Server listening on port " + port);
});
