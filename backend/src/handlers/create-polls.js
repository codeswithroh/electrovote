const {v6} = require('uuid')
const { response } = require("express");

module.exports = (db) => {
  return async (request, response) => {
      const data= {
          _id: v6(),
          title: request.body.title,
          choices: request.body.choices.map(choice => ({
              name: choice,
              count:0,
              _id: v6()
          }))
      }
      await db.collection('polls').insertOne(data)
      return response.json({
          message:'poll created',
          pollId: data._id,
          data
      })
  };
};
