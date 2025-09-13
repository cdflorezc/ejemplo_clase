// controllers/pokemon.js
export async function pokemon_data(name) {
  console.log(name)
  try {
    if (!name) {
      return { error: "Debes enviar un nombre de pokemon" };
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      return { message: "Pokemon no encontrado" };
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name),
      sprite: data.sprites.front_default
    };
  } catch (err) {
    return { error: "Error en el servidor", details: err.message };
  }
}
