import { model, Schema } from "mongoose";

const PokmeonSchema = new Schema({
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
});

export default model("Pokemon", PokmeonSchema);
