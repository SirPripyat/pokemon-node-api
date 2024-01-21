import { model, Schema } from "mongoose";

const PokmeonSchema = new Schema({
  basicInformation: {
    index: {
      type: Number,
    },
    name: {
      type: String,
    },
    pokedexNumber: {
      type: String,
    },
    image: {
      type: String,
    },
    pokemonTypes: {
      type: Array,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    abilities: {
      type: Array,
    },
  },
  baseStats: {
    hp: {
      type: Number,
    },
    attack: {
      type: Number,
    },
    defense: {
      type: Number,
    },
    special_attack: {
      type: Number,
    },
    special_defense: {
      type: Number,
    },
    speed: {
      type: Number,
    },
  },
});

export default model("Pokemon", PokmeonSchema);
