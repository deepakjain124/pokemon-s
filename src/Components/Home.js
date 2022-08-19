import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [Apidata, setapidata] = useState([]);
  const [url, seturl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nexturl, setnexturl] = useState();
  const[loading,setloading]=useState(false)
  const [prevurl, setprevurl] = useState();

  const fetchApi = async () => {
    setloading(true)
    const getData = await axios.get(url);
    setprevurl(getData?.data?.previous);
    setnexturl(getData?.data?.next);
    getpokemon(getData?.data?.results);
    setloading(false)
  };
  const getpokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setapidata((state) => {
        state = [...state, result?.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    fetchApi();
  }, [url]);
  return (
    <>
      <h1 className="heading">Pokemons</h1>
      <div className="buttons">
        {prevurl && (
          <button
            onClick={() => {
              setapidata([]);
              seturl(prevurl);
            }}
          >
            Previous
          </button>
        )}
        {nexturl && (
          <button
            onClick={() => {
              setapidata([]);
              seturl(nexturl);
            }}
          >
            Next
          </button>
        )}
      </div>

      <div className="All_cards">
        {loading?<p>Loading...</p>:
        Apidata.map((elem, i) => {
          return (
            <>
              <div key={i} className="card">
                <img
                  onClick={() => {
                    navigate(`/${i + 1}/${elem.name} `, {
                      state: {
                        image: elem.sprites.other.dream_world.front_default,
                      },
                    });
                  }}
                  src={elem.sprites.other.dream_world.front_default}
                  alt="Avatar"
                  style={{ width: "100%" }}
                />
                <div className="container">
                  <h3>#{elem.id}</h3>
                  <h4>
                    <b>{elem?.name}</b>
                  </h4>
                </div>
              </div>
            </>
          );
        })
      }
      </div>
    </>
  );
};

export default Home;
