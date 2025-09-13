import express from 'express';
const router = express.Router();
import {pokemon_data} from '../../controllers/pokemon.js'



router.get('/', async (req, res, next) => {
  res.json({
    nombre:"cristian",
    apellido:"Florez",
    edad:"25"
  })
});

router.post('/post', async (req, res, next) => {
  const body= req.body 
  res.json({
    message:"Esta es la suma",
    sum: body.nOne + body.nTwo
  })
});

router.post("/pokemon", async(req,res,next)=>{
  console.log(req.headers)
  const token = "2424"
  if(token ==req.headers.token){

    const pokemon = await pokemon_data(req.body.name)
    res.json(pokemon)
  }else{
    res.json({
      message:"No esta autorizado para acceder a esta info"
    })
  }
})

router.get("/pokemones", async(req,res,next)=>{
   try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();

    const names = data.results.map(p => ({name: p.name}));
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor", details: err.message });
  }
})

export default router;