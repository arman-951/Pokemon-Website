import { useEffect, useState } from 'react'
import './index.css'
import { PokemonCards } from './PokemonCards';
export const Pokemon=()=>{
    const [pokemon, setPokemon]=useState([])
    const [loading,setLoading]=useState(true)
    const [error, setError]=useState(null)
    const [search,setSearch]=useState("")

    const API="https://pokeapi.co/api/v2/pokemon?limit=50";

    const fetchPokemon=async()=>{
        try{
            const response=await fetch(API)
            const data=await response.json()
            // console.log(data)

            const detailedPokemonData=data.results.map(async(item)=>{
                const response=await fetch(item.url)
                const data=await response.json()
                return data
                // console.log(item.url)

            })
            // console.log(detailedPokemonData)
            const detailedResponse=await Promise.all(detailedPokemonData)
            console.log(detailedResponse)
            setPokemon(detailedResponse);
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[])

    //search functionality
    const searchData=pokemon.filter((item)=>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return (
            <div>
            <h1>Error...</h1>
            <p style={{color:"red", textAlign:"center"}}>{error.message}</p>
            </div>
        )
    }


    return(
        <>
        <section className='container'>
            <header>
                <h1>Lets Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <div>
                <ul className='cards'>
                    {
                        searchData.map((item)=>{
                            return(
                              <PokemonCards key={item.id} pokemonData={item} />
                            )
                        })
                    }
                </ul>
            </div>
        </section>
        </>
    )
}