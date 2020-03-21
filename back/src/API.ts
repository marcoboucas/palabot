const axios = require("axios");
var querystring = require("querystring");

export default (content: string): Promise<string> => {
  return new Promise(async resolve => {
    axios
      .post(
        `${process.env.PYTHON_URL}`,
        querystring.stringify({ content: content })
      )
      .then((data: any) => {
        resolve(data.data);
      })
      .catch((err: any) => {
        console.log(err.errno, "\n", err.message);
      });
  });
};
