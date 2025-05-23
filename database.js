import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite")

db.prepare(
    "CREATE TABLE IF NOT EXIST recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)"
).run()

export const getRecipes = () => db.prepare("SELECT * FROM recipes").all()
export const getRecipesById = (id) => db.prepare("SELECT * FROM recipes WHERE id = ?").get(id)
export const postRecipes = (title, content) => db.prepare("INSERT INTO recipes (title, content), (?, ?)").get(title, content)
export const deleteRecipes = (id) => db.prepare("DELETE FROM recipes WHERE id = ?").get(id)

const recipes = [
    {id: 1, title: "Amerikai rántott csirkecomb", content: "5 dl író 1 ek fokhagymapor 1 ek fokhagymapor (vöröshagymapor)"},
    {id: 2, title: "Egyszerű tepsis hús", content: " 1 kg burgonya 50 dkg sertéscomb 2 közepes db vöröshagyma 2 ek sertészsír (lágy)"},
    {id: 3, title: "Paradicsomos puha kenyér", content: "380 g kenyérliszt bl80 125 ml paradicsomlé 125 ml víz"},
    {id: 4, title: "Málnás-tejfölkrémes piskótatekercs", content: "65 g finomliszt 15 g vaníliás pudingpor 4 db tojás"}
]