const db = require('../db');

module.exports = {
  loop: () => true,

  exit: () => {
    db.end(() => console.log('exiting application...\ngoodbye!'));
  },

  getChoices: ([rows]) => {
    return rows.map((row) => ({
      name: row.name || row.title,
      value: row.id,
    }));
  },
};
