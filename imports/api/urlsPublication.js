import { Meteor } from "meteor/meteor";
import { UrlsCollection } from "../db/UrlsCollection";

Meteor.publish("urls", function publishUrls() {
  return UrlsCollection.find();
});
