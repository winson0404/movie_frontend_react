import React from "react";

const MovieList = ({ movies, movieCLicked }) => {
	return (
		<div>
			{movies &&
				movies.map((movie) => {
					return (
						<div key={movie.id}>
							<h2 onClick={e=>movieCLicked(movie)}>{movie.title}</h2>
						</div>
					);
				})}
		</div>
	);
};

export default MovieList;
