const axios = require("axios");
var querystring = require("querystring");

export default (content: string): Promise<string> => {
  return new Promise(async resolve => {
    axios
      .post(
        `http://${process.env.PYTHON_URL}:5000/`,
        querystring.stringify({ content: content })
      )
      .then((data: any) => {
        resolve(data.data);
      });
  });
};
