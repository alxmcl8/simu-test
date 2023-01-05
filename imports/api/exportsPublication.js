import { Meteor } from "meteor/meteor";
import { ExportsCollection } from "../db/ExportsCollection";

Meteor.publish("exports", function publishExports() {
  return ExportsCollection.find();
});
