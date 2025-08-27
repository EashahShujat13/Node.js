import mongoose from "mongoose";
import  {MONGO_URL} from './environment.mjs';

mongoose.connect(MONGO_URL)

export default mongoose