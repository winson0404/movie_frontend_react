import React from "react";

const MovieDetails = ({ movie }) => {
	return (
		<div>
			{movie ? (
				<div>
					<h1>{movie.title}</h1>
					<p>{movie.description}</p>
				</div>
			) : null}
		</div>
	);
};

export default MovieDetails;
