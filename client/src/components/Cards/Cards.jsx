import Card from "../Card/Card";
import "./Cards.css";

function Cards({ allGames }) {
  return (
    <div className="card-list">
      {allGames.length > 0
        ? allGames.map((game) => <Card key={game.id} game={game} />)
        : null}
    </div>
  );
}

export default Cards;
