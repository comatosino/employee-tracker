const getChoices = (rows) =>
  rows.map((row) => ({
    name: row.name || row.title,
    value: row.id,
  }));

module.exports = { getChoices };
