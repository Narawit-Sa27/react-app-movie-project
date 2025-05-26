import React, { useRef, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Card from "./Card.jsx";
import { Button, button } from "@material-tailwind/react";
import Banner from '../assets/banner.jpg';
import Load from "./Load.jsx";

// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../App.css';
// import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

function Movie() {

    const API_KEY = "api_key=b0e59006cfeabcfd29cd018a0c18ea80";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageAll, setPageAll] = useState(500);
    const [genresBtn, setGenresBtn] = useState();
    const [search, setSearch] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [genres, setGenres] = useState([]);
    const maxVisibleButtons = 5;
    const [url, setURL] = useState();
    const [url_genre, setURL_Genre] = useState();
    const [category, setCategory] = useState("movie");
    const [tvCategory, setTVCategory] = useState("");
    const [main, setMain] = useState("block");
    const [preview, setPreview] = useState("hidden");
    // const [IDview, setIDView] = useState("");
    const [videos, setVideos] = useState([]);
    const [poster, setPoster] = useState();
    const [title, setTitle] = useState();
    const [poster_path, setPoster_path] = useState();
    const [overview, setOverview] = useState();
    const [release_date, setRelease_date] = useState();
    const [banner, setBanner] = useState(Banner);
    let url_preview;
    const fetchMovies = async () => {
        setLoading(true);
        let movieUrl;

        if (search) {
            setMain("block");
            setPreview("hidden");
            if (category === "movie") {
                movieUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${page}&sort_by=popularity.desc&${API_KEY}`;
                setURL_Genre(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&${API_KEY}`)
            } else if (category === "tv") {
                movieUrl = `https://api.themoviedb.org/3/search/tv?query=${search}&language=en-US&page=${page}&sort_by=popularity.desc&${API_KEY}`;
            }

        } else if (category === "movie") {
            movieUrl = `https://api.themoviedb.org/3/discover/${category}?language=en-US&page=${page}&sort_by=popularity.desc${genresBtn}&${API_KEY}`;
            setURL_Genre(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&${API_KEY}`)
            setPageAll(500);
            setBanner(Banner);
        } else if (category === "tv") {
            
            if (tvCategory === "top_rated") {
                movieUrl = `https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`;
            } else if (tvCategory === "popular") {
                movieUrl = `https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`;

            } else if (tvCategory === "on_the_air") {
                movieUrl = `https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`;
            } else if (tvCategory === "airing_today") {
                movieUrl = `https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`;
            } else {
                movieUrl = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}&sort_by=popularity.desc&${API_KEY}`;
                setPageAll(500);
                setBanner("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/l4pb3wCBGKYc1RaDOyXmJ1oWH9t.jpg");
            }
        }

        try {
            const movieResponse = await fetch(movieUrl);
            const movieData = await movieResponse.json();
            setMovieList(movieData.results);
            search ? setPageAll(movieData.total_pages) : "";

            if (url_genre) {
                const genreResponse = await fetch(url_genre);
                const genreData = await genreResponse.json();
                if (tvCategory != "") {
                    setGenres([
                        { "id": 1, "name": "Top Rated", "link": "top_rated" },
                        { "id": 2, "name": "Popular", "link": "popular" },
                        { "id": 3, "name": "On the Air", "link": "on_the_air" },
                        { "id": 4, "name": "Airing today", "link": "airing_today" }
                    ]);
                } else {
                    setGenres(genreData.genres);
                }
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
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
        // setIDView("");
        setVideos([]);
        setMain("block");
        setPreview("hidden");
        setGenresBtn();
        if (cate === "top_rated") {
            setBanner("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg");
            setCategory("tv");
            setTVCategory(cate);
            setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`);
            setPageAll(99);
        } else if (cate === "popular") {
            setCategory("tv");
            setTVCategory(cate);
            setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`);
            setPageAll(500);
        } else if (cate === "on_the_air") {
            setCategory("tv");
            setTVCategory(cate);
            setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`);
            setPageAll(52);
        } else if (cate === "airing_today") {
            setCategory("tv");
            setTVCategory(cate);
            setURL(`https://api.themoviedb.org/3/tv/${tvCategory}?language=en-US&page=${page}&${API_KEY}`);
            setPageAll(10);
        }
        else {
            setURL_Genre(`https://api.themoviedb.org/3/genre/${cate}/list?language=en-US&${API_KEY}`);
            setURL(`https://api.themoviedb.org/3/discover/${cate}?page=${page}&sort_by=popularity.desc${genresBtn}&${API_KEY}`);
            setTVCategory("");
            setCategory(cate);
        }
    };

    useEffect(() => {
        if (movieList.length === 0) {
            setGenresBtn("");
            // fetchMovies();
        }
    }, [movieList]);

    const handleChangePreview = (id, backdrop_path, title, poster_path, overview, release_date) => {
        setPoster(backdrop_path);
        setTitle(title);
        setPoster_path(poster_path);
        setOverview(overview);
        setRelease_date(release_date);
        setSearch("");
        setMain("hidden");
        setPreview("block");
        if (category === "movie") {
            url_preview = `https://api.themoviedb.org/3/movie/${id}/videos?${API_KEY}`;
        } else {
            if (category === "tv" || tvCategory != "") {
                url_preview = `https://api.themoviedb.org/3/tv/${id}/videos?${API_KEY}`;
            }
        }
        fetch(url_preview)
            .then(data => data.json()).then(data => setVideos(data.results));
    };
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
                <Button key={1} onClick={() => setPage(1)} className={`${page === 1 ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : 'hover:bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end'}`}>
                    1
                </Button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="ellipsis1">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <Button key={i} onClick={() => setPage(i)} className={`${page === i ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : 'hover:bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end'}`}>
                    {i}
                </Button>
            );
        }

        if (endPage < pageAll) {
            if (endPage < pageAll - 1) {
                pageButtons.push(<span key="ellipsis2">...</span>);
            }
            pageButtons.push(
                <Button key={pageAll} onClick={() => setPage(pageAll)} className={`${page === pageAll ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : 'hover:bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end'}`}>
                    {pageAll}
                </Button>
            );
        }

        return pageButtons;
    };

    return (
        <>
          <nav className="fixed right-0 left-0 z-10 bg-black-op">
      <div className="hidden md:flex w-10/12 mx-auto justify-between items-center flex-wrap py-6">
      <img src={Logo} className="logo sm:w-1/4 w-1/4 h-auto object-scale-down" alt="Logo" />
        <ul className="flex justify-between gap-x-8 font-bold">
          <li onClick={() => handleURL("movie")} className={category === "movie" ? "active" : ""}>Movie</li>
          <li onClick={() => handleURL("top_rated")} className={tvCategory === "top_rated" || tvCategory !== "" ? "active" : ""}>Series</li>
          <li onClick={() => handleURL("tv")} className={category === "tv" && tvCategory === "" ? "active" : ""}>Live TV</li>
          {/* <li onClick={() => setURL()} className={category === "sport" ? "active" : ""}>Sport</li> */}
        </ul>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="search-btn relative border-2 border-accent-gradient-start rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm font-bold px-3 py-3 bg-black-op"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={searchMovie}
            />
            <button type="button" className="absolute top-2/4 right-3 -translate-y-2/4">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 flex-wrap">
        <img src={Logo} className="logo w-2/5 h-auto object-scale-down" alt="Logo" />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="search-btn relative border-2 border-accent-gradient-start rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm font-bold px-3 py-3 bg-black-op"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={searchMovie}
            />
            <button type="button" className="absolute top-2/4 right-3 -translate-y-2/4">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <button
          className="text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} px-2 pb-3 pt-2`}>
        <ul className="space-y-1">
          <li onClick={() => handleURL("movie")} className={category === "movie" ? "active" : ""}>Movie</li>
          <li onClick={() => handleURL("top_rated")} className={tvCategory === "top_rated" || tvCategory !== "" ? "active" : ""}>Series</li>
          <li onClick={() => handleURL("tv")} className={category === "tv" && tvCategory === "" ? "active" : ""}>Live TV</li>
        </ul>
      </div>
    </nav>

            {/* Home */}
            <div className={main}>
                <img src={banner} id="img" loading="lazy" alt="" />
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
                                    } else if (tvCategory != "") {
                                        handleURL(res.link);
                                        setPage(1);
                                        setSearch("");
                                    } else {
                                        setGenresBtn(`&with_genres=${res.id}`);
                                        setPage(1);
                                        setSearch("");
                                    }
                                }}
                                className={`hover:bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end ${genresBtn === `&with_genres=${res.id}` || res.link === tvCategory ? 'bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end' : ''}`}
                            >
                                {res.name}
                            </Button>
                        ))}
                    </div>
                    {loading ? (
                        <div key="2" className="animate-pulse grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-x-20 gap-y-10 mt-5">
                            {Array.from({ length: 20 }).map((_, id) => (<Load key={id} />))}
                        </div>
                    ) : (
                        <div key="1" className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-x-20 gap-y-10 mt-5">
                            {movieList.length === 0 ? <p className="notfound">Not Found</p> : movieList.map((res) => (
                                <button key={res.id} onClick={() => category === "movie" ? handleChangePreview(res.id, res.backdrop_path, res.title, res.poster_path, res.overview, res.release_date) : handleChangePreview(res.id, res.backdrop_path, res.name, res.poster_path, res.overview, res.first_air_date)}>
                                    <Card key={res.id} info={res} cate={category} />
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="group py-8 flex flex-wrap justify-center gap-3">
                        <Button onClick={handlePrevPage} className="bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end">Prev</Button>
                        {renderPageButtons()}
                        <Button onClick={handleNextPage} className="bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end">Next</Button>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className={`${preview} flex flex-col gap-9 justify-center items-center relative`}>
                <img className="absolute top-0 left-0 -z-10" style={{ boxShadow: '0 118px 5px 0px rgba(0,0,0,0.75) inset' }} src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${poster}`} width="100%" height="100%" alt={title} />
                <div className="mt-96 w-10/12 mx-auto">
                    <h1 className="text-3xl border-b-2 py-3 mb-8 font-bold">{title}</h1>
                    <div className="flex justify-start gap-12 sm:flex-nowrap flex-wrap">
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} style={{ width: "auto", height: "270px", borderRadius: "5px", objectFit: "cover" }} alt={title} />
                        <div className="flex flex-col gap-8">
                            <h3 className="font-bold text-xl">Storyline</h3>
                            <p>{overview}</p>
                            <h5>{release_date}</h5>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : videos.length === 0 ? (
                    <p className="mt-40 text-center">No videos available</p>
                ) : (
                    <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    slidesPerGroup={1}
                        pagination={{
                            type: 'progressbar',
                        }}
                        navigation={true}
                        breakpoints={{
                            1296: {
                              slidesPerView: 2,
                              slidesPerGroup: 2,
                            },
                          }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {videos.map(video => (
                            <SwiperSlide className="py-4" key={video.id}>
                                <h3 className="py-4">{video.name}</h3>
                                <iframe
                                    width="100%" height="350px"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen>
                                </iframe>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </>
    );

}

export default Movie;
