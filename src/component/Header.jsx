import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Card from "./Card.jsx";
import { Button } from "@material-tailwind/react";
import Banner from '../assets/banner.jpg'
import Load from "./Load.jsx";

function Movie() {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageAll = 500;
    const [genresBtn, setGenresBtn] = useState();
    const [search, setSearch] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [genres, setGenres] = useState([]);
    const maxVisibleButtons = 5;
    let [url, setURL] = useState();
    let [url_genre, setURL_Genre] = useState();
    const [category, setCategory] = useState("movie");
    const [tvCategory, setTVCategory] = useState("");

    const fetchMovies = () => {
        if (search) {
            if (category === "movie") {
            setURL(`https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${page}&sort_by=popularity.desc&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
            } else if (category === "tv") {
                if (tvCategory === "top_rated") {
                    setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
    
                } else {
            setURL(`https://api.themoviedb.org/3/search/tv?query=${search}&language=en-US&page=${page}&sort_by=popularity.desc&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
                }
            }
        } else if (category === "movie") {
            setURL(`https://api.themoviedb.org/3/discover/${category}?language=en-US&page=${page}&sort_by=popularity.desc${genresBtn}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
            setURL_Genre('https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=b0e59006cfeabcfd29cd018a0c18ea80')
        } else if (category === "tv") {
            if (tvCategory === "top_rated") {
                setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)

            } else {
                setURL(`https://api.themoviedb.org/3/discover/${category}?page=${page}&sort_by=popularity.desc${genresBtn}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
            }
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovieList(data.results)
                setLoading(true)
    });

        fetch(url_genre)
            .then(response => response.json())
            .then(data => {
                if (tvCategory === "top_rated") {
                    setGenres([{"id": 1,"name":"Top Rated","link": "top_rated"},{"id": 2,"name":"Popular","link": "popular"},{"id": 3,"name":"On the Air","link": "on_the_air"},{"id": 4,"name":"Airing today","link": "airing_today"}])
                } else {
                setGenres(data.genres)
                }
            });
    };

    useEffect(() => {
        fetchMovies();
    }, [page, genresBtn, search, url, tvCategory]);

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            setPage(1);
            fetchMovies(); 
        }
    };
    const handleURL = (cate) => {
        setGenresBtn();
        if (cate === "top_rated") {
            setTVCategory("top_rated")
            setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`)
        } else {
        setURL_Genre(`https://api.themoviedb.org/3/genre/${cate}/list?language=en-US&api_key=b0e59006cfeabcfd29cd018a0c18ea80`);
        setURL(`https://api.themoviedb.org/3/discover/${cate}?page=${page}&sort_by=popularity.desc${genresBtn}&api_key=b0e59006cfeabcfd29cd018a0c18ea80`);
        setTVCategory()
        }
        setCategory(cate);
        
    };
    useEffect(() => {
        if (movieList.length === 0) {
            setGenresBtn("");
            fetchMovies(); 
        }
    }, [movieList]);
    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, pageAll));
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
        let endPage = Math.min(pageAll, startPage + maxVisibleButtons - 1);

        if (endPage - startPage < maxVisibleButtons - 1) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        if (startPage > 1) {
            pageButtons.push(
                <Button key={1} onClick={() => setPage(1)} className={`${page === 1 ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : ''}`}>
                    1
                </Button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="ellipsis1">...</span>);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <Button key={i} onClick={() => setPage(i)} className={`${page === i ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : ''}`}>
                    {i}
                </Button>
            );
        }
   
        if (endPage < pageAll) {
            if (endPage < pageAll - 1) {
                pageButtons.push(<span key="ellipsis2">...</span>);
            }
            pageButtons.push(
                <Button key={pageAll} onClick={() => setPage(pageAll)} className={`${page === pageAll ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : ''}`}>
                    {pageAll}
                </Button>
            );
        }

        return pageButtons;
    };

    return (
        <>

            <nav className="fixed right-0 left-0 z-10 bg-black-op">
                <div className="w-10/12 mx-auto flex justify-between items-center py-6">
                        <img src={Logo} className="logo" alt="Logo" />
                        <ul className="flex justify-between gap-x-8 font-bold">
                            <li onClick={() => handleURL("movie")} className={category === "movie" ? "active" : ""}>Movie</li>
                            <li onClick={() => handleURL("top_rated")} className={tvCategory === "top_rated" ? "active" : ""}>Top Series</li>
                            <li onClick={() => handleURL("tv")} className={category === "tv" ? "active" : ""}>Live TV</li>
                            {/* <li onClick={() => setURL()} className={category === "sport" ? "active" : ""}>Sport</li> */}
                        </ul>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="search-btn">
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="text-sm font-bold px-3 py-3 bg-black-op border-2 border-accent-gradient-start rounded-md" 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    value={search} 
                                    onKeyDown={searchMovie} 
                                />
                                <button type="button"><i className="fas fa-search"></i></button>
                            </div>
                        </form>
                </div> 
            </nav>
            <img src={Banner} loading="lazy" alt="" />
            <div className="w-10/12 mx-auto mt-8">
                <h1 className="text-3xl font-bold">Movie</h1>
                <div className="category flex flex-wrap gap-4 items-center text-xs font-bold mt-4">
                    {genres.map((res) => (
                        <Button 
                            key={res.id} 
                            onClick={() => {
                              
                                if (tvCategory === "") {
                                    setGenresBtn(`&with_genres=${res.id}`);
                                    setPage(1);
                                    setSearch("");
                                    
                                } else if (tvCategory === res.name) {
                                    setGenresBtn(`&with_genres=${res.id}`);
                                    handleURL(res.link);
                                    setPage(1);
                                    setSearch("");
                                } else {
                                    setGenresBtn(`&with_genres=${res.id}`);
                                    setPage(1);
                                    setSearch("");
                                }
                            }} 
                            className={`${genresBtn === `&with_genres=${res.id}` ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : ''}`}
                        >
                            {res.name}
                        </Button>
                    ))}
                </div>
                {loading ? <div key="1" className="grid grid-cols-5 gap-x-20 gap-y-10 mt-5">
                    {movieList.length === 0 ? <p className="notfound">Not Found</p> : movieList.map((res) => (
                        <>
                        <a href=""><Card info={res} key={res.id} cate={category}/></a>
                        </>
                        
                    ))}
                </div>
                : <div key="2" className="animate-pulse grid grid-cols-5 gap-x-20 gap-y-10 mt-5">
               {Array.from({ length: 20 }).map((_, id) => (<Load key={id} />))}
                </div>
                }
                <div className="group py-8 flex justify-center gap-3">
                <Button onClick={handlePrevPage} className="bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end">Prev</Button>
                    {renderPageButtons()}
                <Button onClick={handleNextPage} className="bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end">Next</Button>
                </div>
            </div>
        </>
    );
}

export default Movie;
