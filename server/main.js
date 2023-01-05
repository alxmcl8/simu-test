import { Meteor } from "meteor/meteor";
import { UrlsCollection } from "../imports/db/UrlsCollection";

import "/imports/api/exportsPublication";
import "/imports/api/urlsPublication";
import "/imports/api/exportMethods";
import "/imports/api/urlsMethods";

const insertUrl = (url) => {
  console.log(`Inserting new Url ${url} to Collection...`);
  UrlsCollection.insert({
    url,
    createdAt: new Date(),
  });
};

Meteor.startup(() => {
  console.log("Meteor Starting up...");
  if (UrlsCollection.find().count() === 0) {
    console.log("Collection empty , filling data"),
      [
        "https://www.lempire.com/",
        "https://www.lemlist.com/",
        "https://www.lemverse.com/",
        "https://www.lemstash.com/",
      ].forEach((urlAddress) => insertUrl(urlAddress));
  }
});
