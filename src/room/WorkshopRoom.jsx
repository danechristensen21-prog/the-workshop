import { roomObjects } from "../data/roomObjects";
import RoomObject from "./RoomObject";

import Whiteboard from "../objects/Whiteboard/Whiteboard";
import Desk from "../objects/Desks/Desk";
import Window from "../objects/Decor/Window";
import CoffeeStation from "../objects/Decor/CoffeeStation";
import BuckyBed from "../objects/Decor/BuckyBed";
import LavaLamp from "../objects/Decor/LavaLamp";
import TrophyShelf from "../objects/Decor/TrophyShelf";
import FileCabinet from "../objects/Decor/FileCabinet";
import Calendar from "../objects/Decor/Calendar";

const objectComponents = {
  Whiteboard,
  Desk,
  Window,
  CoffeeStation,
  BuckyBed,
  LavaLamp,
  TrophyShelf,
  FileCabinet,
  Calendar,
};

export default function WorkshopRoom() {
  return (
    <main className="workshop-room">
      <div className="room-light room-light-one" />
      <div className="room-light room-light-two" />

      <section className="room-stage">
        <div className="neon-sign">IDEAS BECOME REAL HERE</div>
        <div className="back-wall" />
        <div className="floor" />

        {roomObjects.map((object) => {
          const Component = objectComponents[object.component];

          return (
            <RoomObject key={object.id} object={object}>
              <Component object={object} />
            </RoomObject>
          );
        })}
      </section>
    </main>
  );
}
