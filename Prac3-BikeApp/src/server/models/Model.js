import {Model} from 'objection';
import Knex from 'knex';

const options = require('../../../knexfile');

// eslint-disable-next-line new-cap
const knex = Knex(options.staging);
Model.knex(knex);

export default Model;
