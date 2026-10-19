import {Game} from "../../game/model/game";
import {Client} from "../../client/model/client";

export interface Borrowing {
    id: number;
    game: Game;
    client: Client;
    startDate: Date;
    endDate: Date;
}