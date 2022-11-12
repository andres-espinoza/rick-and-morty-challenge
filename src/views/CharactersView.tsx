import { useEffect } from 'react';
import CharactersService from '../services/characters';

const CharactersView = () => {
  const fetchCharactersByPage = async () => {
    try {
      const characters = await CharactersService.getCharactersPage(2);
      console.log(characters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharactersByPage().catch((e) => console.log(e));
  }, []);
  return <div>Characters View</div>;
};

export default CharactersView;
