const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const port = 3000;


app.use(express.json());

app.post("/animal", async (req, res)=>{
  const { nome,idade, especie } =req.body
  try{
    const novoAnimal = await prisma.animal.create({
      data:{nome, idade, especie},
    });
    res.status(201).json(novoAnimal);
  } catch(error){
    res.status(500).json({error:"Erro ao criar o animal"})
  }
} )

app.get("/animal", async (req, res) => {
  try {
    const animais = await prisma.animal.findMany();
    res.json(animais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os animais" });
  }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });