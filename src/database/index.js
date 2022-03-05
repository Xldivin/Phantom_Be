import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://Divin:axel123@cluster0.0yq1j.mongodb.net/Backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("App connected to Mongodb successfully")
})
.catch((e) => {
    console.log("Mongodb connection error "+e.message);
})