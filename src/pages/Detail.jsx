import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { img_300, img_not_available } from "../config";

const API_KEY = "f1717ef8baf4c215e7bc86e8c5f39960";

const Detail = () => {
    const params = useParams();
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [credits, setCredits] = useState();
    const titleName = content && content.name && content.name !== ""
            ? content.name
            : content && content.title && content.title !== ""
            ? content.title
            : "";

    const id = params.movieId;
    const mediaType = params.mediaType;
    const _media_type = params && mediaType && mediaType !== "" ? mediaType.toLowerCase() : "";

    const getDetail = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`);
            setContent(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getVideo = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${_media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`);
            setVideo(data.results[0]?.key);
        } catch (error) {
            console.error(error);
        }
    };

    const getCredits = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${_media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`);
            setCredits(data.cast);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetail();
        getVideo();
        getCredits();
    }, []);

    const renderDataHtml = () => {
        const ImageURL = content.poster_path ? img_300 + content.poster_path : img_not_available;
        const tagline = content.tagline || "";
        const vote_average = parseInt(content.vote_average);
        const original_language = content.original_language || "";
        const adult = !content.adult ? "10+" : "18+";
        const origin_country = content.origin_country && content.origin_country[0]
                ? content.origin_country[0]
                : content.production_countries &&
                  content.production_countries[0] &&
                  content.production_countries[0].name
                ? content.production_countries[0].name
                : "";
        const overview = content.overview;
        const first_air_date = content.first_air_date || content.release_date;
        const budget = content.budget || "";
        const genres = content.genres && content.genres.length > 0
                ? content.genres.map((item) => (
                      <span key={item.id}>{item.name}</span>
                  ))
                : "";
        return (
            <Row>
                <Col className="col-12 mb-4">
                    <h1>
                        {titleName}
                        {
                            tagline && tagline !== "" ? (<small> {tagline}</small>) : ("")
                        }
                    </h1>
                </Col>
                <Col className="col-12 col-xl-6">
                    <div className="card card--details">
                        <div className="card__cover">
                            <img src={ImageURL} alt={titleName} />
                        </div>
                        <div className="card__content">
                            <div className="card__wrap">
                                <ul className="card__list">
                                    <li className="card__wrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="card__rate" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                        </svg>
                                        {vote_average}
                                    </li>
                                    <li>{original_language}</li>
                                    <li>{adult}</li>
                                </ul>
                            </div>
                            <ul className="card__meta">
                                <li>
                                    <span>Genre:</span>
                                    <span className="linkTag">{genres}</span>
                                </li>
                                <li>
                                    <span>Type:</span>
                                    <span className="linkTag">
                                        {_media_type}
                                    </span>
                                </li>

                                <li>
                                    <span>Release year:</span>{" "}
                                    <span className="linkTag">
                                        {first_air_date}
                                    </span>
                                </li>
                                {budget && budget !== "" ? (
                                    <li>
                                        <span>Budget:- </span>
                                        <span className="linkTag">
                                            {" "}
                                            {budget}
                                        </span>
                                    </li>
                                ) : (
                                    ""
                                )}

                                <li>
                                    <span>Country:</span>{" "}
                                    <span className="linkTag">
                                        {origin_country}
                                    </span>{" "}
                                </li>
                            </ul>
                            <div className="description_readmore_wrapper pe-2">{overview}</div>
                        </div>
                    </div>
                </Col>
                <Col className="col-12 col-xl-6">
                    <div className="frameSec">
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </Col>
            </Row>
        );
    };

    return (
        <div
            expand="lg"
            className="bg-body-tertiary header"
            bg="dark"
            data-bs-theme="dark"
        >
            <main className="detailsPage">
                <Container>
                    {titleName  ? renderDataHtml() : "Loading..."}
                </Container>
                <section className="section">
                    <div className="contentHead">
                        <Container>
                            <Row></Row>
                        </Container>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Detail;
