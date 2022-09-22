import { URI } from "src/config";
import mongoose from "mongoose";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(URI, (err) => {
    if (err) throw err
    return connectionParams;
})