const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String, required: true, trim: true,
  },
  email: {
    type: String, required: true, unique: true, trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
  },
  group_points: { type: Number, default: 0 },
  group_tasks: { type: Number, default: 0 },
  group_name: { type: String, default: 'eunomia-test' },
  lists: [
    [
      {
        title: { type: String, required: true, trim: true },
        icon: { type: String, required: true, trim: true },
        creator: { type: String, required: true, trim: true },
        date: { type: String, trim: true },
        checked: { type: Boolean, required: true },
        tagColor: { type: String, required: true, trim: true },
      },
    ],
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
