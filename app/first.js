const first = (app) => {
  /*
  /
  / 	HTTP:GET | backend_url:port/
  /
  / 	return "Hello World!"
  /
  */
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

	/*
	/ 
	/ 	HTTP:POST | backend_url:port/(your user)
  /
  / 	body 
  /   {
  /      "a": (number),
  /      "b": (number)
  /   }
	/
	/ 	return sum of two numbers
	/		{	
	/			"message":
	/					{
	/							"id": (message id),
	/							"User": "(user name)",
	/							"Message": "(message)",
	/							"createdAt": "(create time)",
	/							"updatedAt": "(update time)"
	/					}
	/		}
	/
	*/
  app.post("/calculate", (req, res) => {
    if (!req.body.a || !req.body.b) {
      return res.status(400).send({
        message: "Запит порожній",
      });
    }

    const result = req.body.a + req.body.b;

    return res.status(200).send({
      result: result,
    });
  });
}

export default first;
