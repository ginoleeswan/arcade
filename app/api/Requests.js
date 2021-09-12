const API_KEY = "a5dc51990cf541aba0f759e85e41a324";

const requests = {
  fetchTrendingGames: `games/?key=${API_KEY}`,
  fetchMustPlayGames: `collections/must-play/feed/?key=${API_KEY}`,
  fetchIndieGames: `games/?key=${API_KEY}&genres=indie`,
  fetchRacingGames: `games/?key=${API_KEY}&genres=racing`,
  fetchStrategyGames: `games/?key=${API_KEY}&genres=strategy`,
  getGameByID: `games/`,
};

export default requests;
