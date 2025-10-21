import { PokemonController } from '../controllers/PokemonController';
import { PokemonService } from '../services/PokemonService';
import { PokemonTypeService } from '../services/PokemonTypeService';
import { PokemonTypeController } from '../controllers/PokemonTypeController';

class DependencyContainer {
  private readonly pokemonService: PokemonService;
  private readonly pokemonTypeService: PokemonTypeService;

  private readonly pokemonController: PokemonController;
  private readonly pokemonTypeController: PokemonTypeController;

  constructor() {
    this.pokemonService = new PokemonService();
    this.pokemonTypeService = new PokemonTypeService();

    this.pokemonController = new PokemonController(this.pokemonService);
    this.pokemonTypeController = new PokemonTypeController(
      this.pokemonTypeService,
    );
  }

  public getPokemonController(): PokemonController {
    return this.pokemonController;
  }

  public getPokemonTypeController(): PokemonTypeController {
    return this.pokemonTypeController;
  }
}

export const container = new DependencyContainer();
