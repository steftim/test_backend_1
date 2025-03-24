import message from "./database.js";

const second = (app) => {

	/*
	/ 
	/ 	HTTP:GET | backend_url:port/message/
	/
	/ 	return all messages
	/		{	
	/			"messages": [
	/					{
	/							"id": (message id),
	/							"User": "(user name)",
	/							"Message": "(message)",
	/							"createdAt": "(create time)",
	/							"updatedAt": "(update time)"
	/					},
	/					{
	/							"id": (message id),
	/							"User": "(user name)",
	/							"Message": "(message)",
	/							"createdAt": "(create time)",
	/							"updatedAt": "(update time)"
	/					}				]
	/		}
	/
	*/
	app.get("/message", async (req, res) => {
		const messages = await message.getAll();
    
    return res.status(200).send({
      messages: messages
    });
	});


	/*
	/ 
	/ 	HTTP:GET | backend_url:port/message/(your user)
	/
	/ 	return all user messages
	/		{	
	/			"messages": [
	/					{
	/							"id": (message id),
	/							"User": "(user name)",
	/							"Message": "(message)",
	/							"createdAt": "(create time)",
	/							"updatedAt": "(update time)"
	/					},
	/					{
	/							"id": (message id),
	/							"User": "(user name)",
	/							"Message": "(message)",
	/							"createdAt": "(create time)",
	/							"updatedAt": "(update time)"
	/					}				]
	/		}
	/
	*/
	app.get("/message/:user", async (req, res) => {
		const messages = await message.getByUser(req.params.user);
    
    return res.status(200).send({
      messages: messages
    });
	});

	
	/*
	/ 
	/ 	HTTP:POST | backend_url:port/message/(your user)
  	/
	/	 body
  	/ 	{
	/			message: "(your message)"		
	/	 }
	/
	/ 	return created message
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
	app.post("/message/:user", async (req, res) => {
		if(!req.body.message){
		    return res.status(400).send({
					error: 'no message'
				});
		}
		const result = await message.add(req.params.user, req.body.message);
    
    return res.status(200).send({
      message: result
    });
	});


	/*
	/ 
	/ 	HTTP:PUT | backend_url:port/message/(message id)
  	/
	/	 body
  	/ 	{
	/			message: "(your message)"		
	/	 }
	/
	/ 	return updated message
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
	app.put("/message/:id", async (req, res) => {
		if(!req.body.message){
		  return res.status(400).send({
				error: "no message"
			});
		}
		const result = await message.update(req.body.message, req.params.id);
    
    return res.status(200).send({
      result: result
    });
	});

	/*
	/ 
	/ 	HTTP:DELETE | backend_url:port/message/(message_id)
	/
	/ 	return result 1 | 0
	/	 {
	/ 		"result": 1
	/ 	}
	/
	*/
	app.delete("/message/:id", async (req, res) => {
		const result = await message.delete(req.params.id);
    
    return res.status(200).send({
      result: result
    });
	});
}

// create one message from user1 with text "hello world!"
await message.add("user1", "hello world!");

export default second;
