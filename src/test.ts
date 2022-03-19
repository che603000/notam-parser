import {Notams} from './lib'
import data from './data/notam-data.json'

const notams = new Notams(data.items);
//const actives = notams.createActiveTime("LZ", ["RR"]);
//const regime = notams.createRegime('REGIMEZ', ["RT", "WB", "WD", "WP", "WE", "WM"]);
const messages = notams.createMessage('NOTAM');

debugger

