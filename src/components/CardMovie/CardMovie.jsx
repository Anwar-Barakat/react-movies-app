import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { img_300, img_not_available } from "../../config";

const CardMovie = ({ data, mediaType }) => {
    const media_type = data.media_type ?? mediaType;
    const imgURL = data.poster_path
        ? img_300 + data.poster_path
        : img_not_available;

    return (
        <Link to={`/detail/${data.id}/${media_type} `}>
            <figure className="">
                <span>
                    <img src={imgURL} alt={data.original_title} />
                </span>
            </figure>
        </Link>
    );
};

export default CardMovie;
