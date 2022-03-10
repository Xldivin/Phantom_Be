import mongoose from "mongoose";

const SubsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});
const Subs = mongoose.model('Subs', SubsSchema);
export default Subs;