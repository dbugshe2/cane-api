const { getDatabase } = require("./mongo");
const { ObjectID } = require("mongodb");

const collectionName = "canes";
/* 
? managing canes,
need to: 
(1) register a user/caretaker -- post
(2) register cane to user -- post / patch
(3) authenticate user -- post
(4) authorise user 
(5) authorise 'cane'
(6) recieve info from authorised cane -- post
(7) send information of authorised cane to authorised user app -- get
! - don't actually know what the fuck I'm doing here
*
*
 */
async function insertAd(ad) {
  const database = await getDatabase();
  const insertedId = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

async function getAds() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
}

async function deleteAd(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id)
  });
}

async function updateAd(id, ad) {
  const database = await getDatabase();
  delete ad._id;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectID(id) },
    {
      $set: {
        ...ad
      }
    }
  );
}

module.exports = {
  insertAd,
  getAds,
  deleteAd,
  updateAd
};
