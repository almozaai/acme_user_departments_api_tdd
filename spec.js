const { expect } = require('chai'); 
const db = require('./db');
const { Product, Category } = db.models; 
const app = require('supertest')(require('./app'));