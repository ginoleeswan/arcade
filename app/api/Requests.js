const API_KEY = "a5dc51990cf541aba0f759e85e41a324";

const requests = {
  fetchTrendingGames: `games/?key=${API_KEY}`,
  fetchMustPlayGames: `collections/must-play/feed/?key=${API_KEY}`,
  fetchIndieGames: `games/?key=${API_KEY}&genres=indie`,
  fetchRacingGames: `games/?key=${API_KEY}&genres=racing`,
  fetchAdventureGames: `games/?key=${API_KEY}&genres=adventure`,
  fetchStrategyGames: `games/?key=${API_KEY}&genres=strategy`,
  fetchRPGGames: `games/?key=${API_KEY}&genres=role-playing-games-rpg`,
  fetchSimulationGames: `games/?key=${API_KEY}&genres=simulation`,
  fetchSportGames: `games/?key=${API_KEY}&genres=sports`,
  fetchCasualGames: `games/?key=${API_KEY}&genres=casual`,
  fetchShooterGames: `games/?key=${API_KEY}&genres=shooter`,
  getGameByID: `games/`,
};

export default requests;
