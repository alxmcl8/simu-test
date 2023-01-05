import { UrlsCollection } from "../db/UrlsCollection";

Meteor.methods({
  "urls.getRandom"() {
    var allUrls = UrlsCollection.find().fetch();
    var randomIndex = Math.floor(Math.random() * allUrls.length);
    var url = allUrls[randomIndex];
    return url;
  },
});
