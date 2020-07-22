const db = require('./../models/model');

// return a random prompt of a given type
const getPrompt = async (type) => {
  const values = [type];
  //   query selects a random row of a given typ
  const query = `
    select id, prompt from prompts
    where prompt_type = $1
    order by RANDOM() LIMIT 1;
    `;

  const result = await db.query(query, values);

  return result.rows[0];
};

module.exports = getPrompt;
