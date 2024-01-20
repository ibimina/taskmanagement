import mongoose from "mongoose";
import Account from '../account.interface'

const accountSchema = new mongoose.Schema({
    username:String ,
    email :String,
    password: String
})
const accountModel = mongoose.model<Account & mongoose.Document>('Account', accountSchema)
export default accountModel