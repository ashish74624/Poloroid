import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  place: { type: String },
  friends: { type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }], default: [] },
  notifications: {
    type: [
      {
        sender: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          name: { type: String, required: true },
          profilePicture: String,
        },
      },
    ],
    default: [],
  },
  request: {
    type: [
      {
        sentTo: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
      },
    ],
    default: [],
  },
  rejectedBy: { type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }], default: [] },
}, { collection: 'Users' });

const User = mongoose.model('User', UserSchema);

export default User;
