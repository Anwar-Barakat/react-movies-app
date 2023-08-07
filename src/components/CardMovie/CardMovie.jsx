import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { img_300, img_not_available } from "../../config";

const CardMovie = ({ data, mediaType }) => {
    const media_type = data.media_type ?? mediaType;
    const imgURL = data.poster_path
        ? img_300 + data.poster_path
        : img_not_available;
    const vote_average = parseInt(data.vote_average);
    const original_language = data.original_language || "";
    const release_date = data.release_date || data.first_air_date;

    return (
        <Link
            to={`/detail/${data.id}/${media_type} `}
            className="video-thumb relative"
        >
            <figure className="video-image">
                <span>
                    <img src={imgURL} alt={data.original_title} />
                </span>
                <div className="circle-rate">
                    <svg
                        className="circle-chart"
                        viewBox="0 0 30 30"
                        width="100"
                        height="100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="circle-chart__background"
                            stroke="#2f3439"
                            strokeWidth="2"
                            fill="none"
                            cx="15"
                            cy="15"
                            r="14"
                        ></circle>
                        <circle
                            className="circle-chart__circle"
                            stroke="#4eb04b"
                            strokeWidth="2"
                            strokeDasharray={`${vote_average}0,100`}
                            cx="15"
                            cy="15"
                            r="14"
                        ></circle>
                    </svg>
                    <b>{vote_average}</b>
                </div>
                <div className="hd">
                    {media_type}
                    <b>{original_language}</b>
                </div>
            </figure>
            <div className="video-content">
                <h2 className="name">{data.title}</h2>
                <ul className="tags">
                    <li>Release Date</li>
                </ul>
                <small className="range">{release_date}</small>
            </div>
        </Link>
    );
};

export default CardMovie;
