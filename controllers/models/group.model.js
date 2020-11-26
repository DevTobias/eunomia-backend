const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  groupName: {
    type: String, required: true, trim: true, uniquie: true,
  },
  members: [
    { type: String, required: true, trim: true },
  ],
  list: [
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

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
