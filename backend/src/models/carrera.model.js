"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carreraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    facultad: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Carrera = mongoose.model('Carrera', carreraSchema);

module.exports = Carrera;