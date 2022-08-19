import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dropdown from "./Dropdown";

const Pokemondetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { id, name } = useParams();
  const [pokemonid] = useState(id);
  const [pokemonDetails, setpokemonDetails] = useState([]);
  const [Basestats, setbasestats] = useState([]);
  const FetchPokemondata = async () => {
    const get = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonid}/`
    );
    setpokemonDetails(get?.data);
    setbasestats(get?.data);
  };
  useEffect(() => {
    FetchPokemondata();
  }, [pokemonid]);



  return (
    <>
      <h1 className="heading">Pokemon Details of {name}</h1>
      <div className="pokemon_details">
        <div className="BackTo_Page">
          <p onClick={() => navigate("/")}>Back</p>
        </div>
        <div>
          {pokemonDetails ? (
            <img src={location.state.image} width="200px" alt="pokemon_image" />
          ) : (
            <p>Loading.....</p>
          )}
        </div>
        <h1>Height:-{pokemonDetails?.height} CM</h1>
        <h1>weight:-{pokemonDetails?.weight} KG</h1>
        <h1>Stat Details :-</h1>
        <div className="stats_details">
          {pokemonDetails?.stats?.map((elem, i) => {
            return (
              <>
                <Dropdown key={i}  elem={elem} />
              </>
            );
          })}
        </div>
      </div>
        </>
  );
};

export default Pokemondetail;
