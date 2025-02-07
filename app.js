import express from "express";
const app = express();
const server = app.listen(3000, () => {
    console.log("listening!");
})

// Express middleware are functions that are used to modify the request and/or response.
// Several middlewares can be combined into a chain, which each one modifying the requst/response and passing them to the next middleware.
// Used to extend the functionality of our program.

const firstMiddleware = (req, res, next) => {
    // modify req and res here
    // add a message to the response
    res.locals.message = "Hello Middleware! ";
    next(); // pass control to the next middleware or route handler (where the response will be sent)
}

const secondMiddleware = (req, res, next) => {
    res.locals.message += "A Different Message ";
    next();
}

// Place the middleware in the request/response pipeline:
app.use(firstMiddleware);
app.use('/b', secondMiddleware);

// Place this after placing middleware otherwise the function cannot get the res message
app.get('/a', (req,res)=>{
    res.send("Endpoint A: " + res.locals.message);
});

app.get('/b', (req,res)=>{
    res.send("Endpoint B: " + res.locals.message);
});

app.get('/c', secondMiddleware, (req,res)=>{
    res.send("Endpoint C: " + res.locals.message);
});

// CHALLENGE: figure out how to show the message from BOTH middlewares in the response from endpoint C.
// Hint: modify the middleware NOT the route handler