import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const MovieDetails = ({ movie, updateMovie }) => {
	const [highlighted, setHighlighted] = useState(-1);

	const rateClicked = (rate, id) => {
		fetch(`http://127.0.0.1:8000/api/movies/${id}/rate_movie/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Token 55252c9d226d4ca9fd129d08f1f9476afda5fcc7",
			},
			//TODO: add comments 
			body: JSON.stringify({ stars: rate + 1, comments: "" }),
		})
			.then( res => res.json())//TODO: remove console.logs
			.then( res => console.log(res))
			.then(()=>loadMovie(id))
			.catch((err) => console.log(err));
	};

	const loadMovie = (id) => {
		fetch(`http://127.0.0.1:8000/api/movies/${id}/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Token 55252c9d226d4ca9fd129d08f1f9476afda5fcc7",
			}
		})
			.then( res => res.json())
			.then( res => updateMovie(res))
			.catch((err) => console.log(err));
	};

	

	//logic for displaying star and half star
	const display_rating = (rating) => {
		var display = [];

		for (var i = 1; i < 6; i++) {
			if (rating >= i)
				display.push(
					<FontAwesomeIcon key={i} icon={faStar} className="star" />
				);
			else if (i - rating !== 0 && i - rating < 1)
				display.push(
					<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star" />
				);
			else
				display.push(<FontAwesomeIcon key={i} icon={farStar} className="" />);
		}
		return display;
	};


	return (
		<div>
			{movie ? (
				<>
					<div>
						<h1>{movie.title}</h1>
						<p>{movie.description}</p>
						{display_rating(movie.avg_rating).map((star, id) => {
							return star;
						})}
						({movie.no_of_ratings})
					</div>
					<div className="rate-container">
						<h2>Rate it</h2>
						{[...Array(5)].map((e, i) => {
							return (
								<FontAwesomeIcon
									key={i}
									icon={faStar}
									className={i <= highlighted ? "rate-star" : ""}
									onMouseEnter={() => setHighlighted(i)}
									onMouseLeave={() => setHighlighted(-1)}
									onClick={(e) => rateClicked(i, movie.id)}
								/>
							);
						})}
					</div>
				</>
			) : null}
		</div>
	);
};

export default MovieDetails;
