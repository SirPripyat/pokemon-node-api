import { model, Schema } from "mongoose";

const PokemonTypeSchema = new Schema({
  name: {
    type: String,
  },
  weaknessess: {
    type: Array,
  },
});

export default model("Types", PokemonTypeSchema);
