import { ExportsCollection } from "../db/ExportsCollection";

Meteor.methods({
  "exports.insert"() {
    return ExportsCollection.insert({
      url: null,
      progress: 0,
      createdAt: new Date(),
    });
  },

  "exports.remove"(exportId) {
    const exportToDelete = ExportsCollection.findOne({ _id: exportId });

    if (!exportToDelete) {
      throw new Meteor.Error("Record not Found.");
    }

    ExportsCollection.remove(exportToDelete);
  },

  "exports.increment"(exportId) {
    const exportToUpdate = ExportsCollection.findOne({ _id: exportId });

    ExportsCollection.update(exportToUpdate, {
      progress: Math.min(exportToUpdate.progress + 5),
    });
  },

  "exports.update"(exportId, url) {
    const exportToUpdate = ExportsCollection.findOne({ _id: exportId });

    if (!exportToUpdate) {
      throw new Meteor.Error("Record not Found.");
    }

    ExportsCollection.update(exportId, { $set: { url: url } });
  },
});
