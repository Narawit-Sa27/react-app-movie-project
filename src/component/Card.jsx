import React, { useEffect, useState } from 'react'
import Poster from "../assets/poster null.png";
// import { Button } from "@material-tailwind/react"

function Card(movie) {
   
    let name;
    let date;
    let image;
    switch (movie.cate) {
        case 'movie':
            name = movie.info.title;
            date = movie.info.release_date;
        break;
        case 'tv':
            name = movie.info.name;
            date = movie.info.first_air_date;
        break;
        case 'top_rated':
            name = movie.info.name;
            date = movie.info.first_air_date;
        break;
        default:
            name = movie.info.title;
            date = movie.info.release_date;
        break;
      }

      movie.info.poster_path != null ? image = `https://image.tmdb.org/t/p/w500${movie.info.poster_path}`: image = Poster;

    return(
                <>
                <div className='h-full relative cursor-pointer hover:drop-shadow-shadow-color active:drop-shadow-shadow-color flex flex-col gap-3'>
                <span className="hover:animate-ping absolute h-full w-full bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end opacity-0 hover:opacity-5"></span>
                    <img style={{width:"100%",height:"auto",borderRadius: "5px",objectFit:"cover"}} src={image} alt={movie.info.title} />
                    <div className="flex flex-col gap-2 justify-between items-start h-full">
                        <h5 className='text-base font-bold text-start'>{name}</h5>
                        <div className='flex justify-between w-full'>
                            <p className='text-sm text-Secondary-text font-bold'>{date}</p>
                            <p className='text-sm text-Star font-bold'>{movie.info.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
                </>
    )
}

export default Card