const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')

const {storage} = require("../cloudConfig.js");

const upload = multer({ storage })

 

// all listing
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('image'),
        wrapAsync(listingController.createListing)
    )

// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


// single listing 
router
    .route("/:id")
    .get(wrapAsync( listingController.showListing))
    .put( isLoggedIn, isOwner,upload.single('image'), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))


// edit route
router.get("/:id/edit", isLoggedIn ,wrapAsync(listingController.renderEditForm))

module.exports = router;

