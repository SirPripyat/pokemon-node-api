import { model, Schema } from "mongoose";

const EvolutionChainSchema = new Schema({
  name: {
    type: String,
  },
  evolutionChain: {
    type: Array,
  },
});

export default model("EvolutionChain", EvolutionChainSchema);
