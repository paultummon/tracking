const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roamingRange: {
        type: String,
        required: true
    },
    currentGeoLocation: {
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        } 
    },
    baseGeoLocation: {
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        } 
    },
    notificationMessage: {
        type: String,
        required: true
    },
    registered_date: {
        type: Date, 
        default: Date.now
    }
})

module.exports = User = mongoose.model('patient', PatientSchema)