const express = require("express");
const PropertyCollection = require("../models/propertyModel.js");

const router = express.Router();

router.get("/property", async (req, res) => {
  try {
    const data = await PropertyCollection.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      data: data,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.post("/property", async (req, res) => {
  try {
    const collection = new PropertyCollection({
      property: req.body.propertyType,
      contact: req.body.mobile,
      area: req.body.area,
      daysLeft: req.body.daysLeft,
    });
    await collection.save();
    res.status(200).json({
      status: "Success",
      message: "Data added to Database",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;
