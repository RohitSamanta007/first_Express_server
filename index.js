console.log("hello");
import fs from "fs";
//const express = require("express"); // this is ok if the "type" : "module" is not in the package json file
// else
import express from "express";
const app = express();

const port = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello World")
// });
// app.get("/about", (req, res)=>{
//     res.send("Your request is About us page : ")
// })

// send and get data from client
app.use(express.json()) //any data that comes up with json format we accept that data

let carData = [];
let nextIndex = 1;

// add car using post request
 app.post('/cars', (req, res)=>{
    const {name, price} = req.body
    const newCar = {
        id:nextIndex++,  
        name,
        price 
    }
    carData.push(newCar);
    res.status(201).send(newCar )
 })

// get all cars using get request
 app.get("/cars-all", (req, res)=>{
    res.status(200).send(carData);
 })

 //get a specific car based on id in the url
 app.get("/cars/:id", (req, res)=>{
    let car = carData.find(t => t.id === parseInt(req.params.id));
    if(!car){
        return res.status(404).send("Car Not found");
    }
    res.status(200).send(car);
 })

 //update a specific car based on id in the url
 app.put("/cars/:id", (req, res)=>{
    let car = carData.find(t => t.id === parseInt(req.params.id));
    if(!car){
        return res.status(404).send("Car Not found");
    }
    let {name, price} = req.body;
    car.name = name;
    car.price = price;
    res.status(200).send(car);
 })

 //delete a specific car based on id in the url
 app.delete("/cars/:id", (req, res)=>{
    let index = carData.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send("Car Not found");
    }
    carData.splice(index, 1);
    res.status(200).send("Delete successfully...");
 })



app.listen(port, () => {
  console.log("Server is running on port No : ", port);
});
