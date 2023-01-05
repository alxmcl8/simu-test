import { Template } from "meteor/templating";
import { ExportsCollection } from "../db/ExportsCollection";

import "./App.html";
import "./Export.js";

const IS_LOADING_STRING = "isLoading";
const EXPORT_PROGRESS_COMPLETE = 100;
const TIME_INCREMENT = 1000;

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const exportsHandler = Meteor.subscribe("exports");
  const urlHandler = Meteor.subscribe("urls");

  Tracker.autorun(() => {
    this.state.set(
      IS_LOADING_STRING,
      !exportsHandler.ready() && !urlHandler.ready()
    );
  });
});

Template.mainContainer.helpers({
  exports() {
    return ExportsCollection.find().fetch();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  },
});

Template.form.events({
  "submit .export-form"(event) {
    event.preventDefault();

    Meteor.call("exports.insert", (error, result) => {
      const newExport = ExportsCollection.findOne({ _id: result });
      if (!newExport) {
        throw new Meteor.Error("Export not Found");
      }

      const simuProgress = Meteor.setInterval(function () {
        if (newExport.progress < EXPORT_PROGRESS_COMPLETE) {
          Meteor.call("exports.increment", newExport._id);
        }
      }, TIME_INCREMENT);

      Meteor.setTimeout(function () {
        clearInterval(simuProgress);

        return Meteor.call("urls.getRandom", (error, result) => {
          if (!error) Meteor.call("exports.update", newExport._id, result.url);
        });
      }, 20000);
    });
  },
});
