/* eslint-disable no-console */
const router = require('express').Router();

const Group = require('../models/group.model');

//* ---------------------------------------- *\\
//* ---------- Group information ----------- *\\
//* ---------------------------------------- *\\

router.route('/create').post((req, res) => {
  const query = { groupName: req.body.groupName };

  Group.findOne(query, async (mdbError, doc) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (doc) res.status(400).json({ message: 'group already exists' });
    else {
      const newGroup = new Group({
        groupName: req.body.groupName,
        members: req.body.members,
        list: [[]],
      });
      await newGroup.save()
        .then(() => res.status(200).json({
          message: 'group successfully added',
          newGroup,
        }))
        .catch((saveError) => res.status(500).json(saveError.toString()));
    }
  }).catch((findError) => res.status(500).json(findError.toString()));
});

router.route('/get-list').post((req, res) => {
  const query = { groupName: req.body.groupName };

  Group.findOne(query, async (mdbError, doc) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (!doc) res.status(400).json({ message: 'group not found' });
    else {
      res.status(200).json({ message: 'successfully sent group lists', list: doc.list });
    }
  }).catch((findError) => res.status(500).json(findError.toString()));
});

router.route('/save-list').post((req, res) => {
  const query = { groupName: req.body.groupName };

  Group.findOne(query, async (mdbError, doc) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (!doc) res.status(400).json({ message: 'group not found' });
    else {
      const query1 = { groupName: req.body.groupName };
      const update = { list: req.body.lists };
      const options = { returnNewDocument: true };

      const { members } = doc;
      let k = 0;
      for (let i = 0; i < update.list.length; i += 1) {
        for (let j = 0; j < update.list[i].length; j += 1) {
          update.list[i][j].creator = members[k % members.length];
          k += 1;
        }
      }

      Group.findOneAndUpdate(query1, update, options)
        .then((updatedDocument) => {
          if (!updatedDocument) res.status(400).json({ message: 'could not save group list' });
          res.status(200).json({ message: 'successfully saved group list' });
        })
        .catch((err) => res.status(500).json(`Error: ${err}`));
    }
  }).catch((findError) => res.status(500).json(findError.toString()));
});

module.exports = router;
