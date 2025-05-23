import express from "express"
import * as db from './util/database.js'

const app = express()
app.use(express.json())

app.get("/recipes", (req, res) => {
    try{
        const recipes  = db.getRecipes()
        if(!recipes){
            res.status(400).json({message :"Failed to get"})
        }
        res.status(200).json(recipes)
    }
    catch (error){
        res.status(500).json({message: "Error" +error})
    }
})

app.get("/recipes/:id", (req, res) => {
    try{
        const recipes  = db.getRecipesById(req.params.id)
        if(!recipes){
            res.status(400).json({message :"Failed to get"})
        }
        res.status(200).json(recipes)
    }
    catch (error){
        res.status(500).json({message: error})
    }
})

app.post("/recipes/:id", (req, res) => {
    try{
        const {title, content} = req.body
        if(!title || !content){
            res.status(400).json({message :"Failed to post"})
        }
        const postedRecepi = db.postRecipes(title, content)
        if(postedRecepi.change != 1){
            res.status(422).json({message: "Failed data"})
        }
        res.status(201).json({id: postedRecepi.lastInsertRowId})
    }
    catch (error){
        res.status(500).json({message: error})
    }
})

app.delete("/recipes/:id", (req, res) => {
    try{
        const recipes = db.deleteRecipes(req.params.id)
        if(recipes.changes != 1){
            res.status(404).json({message :"Nincs ilyen id"})
        }
        res.status(204).json({message: "Delete successful"})
    }
    catch (error){
        res.status(500).json({message: error})
    }
})


PORT = 8080
app.listen(PORT, () => console.log("Server runs on port" + PORT))