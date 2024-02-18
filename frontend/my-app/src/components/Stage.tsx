import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser, findplayercolumn, findplayerrow } from "../hooks/useUser";

const Stage = () => {
  const params = useParams();

  const {
    data,
    error,
    isLoading,
    stage,
    playerrow,
    playercolumn,
    setstage,
    setplayerrow,
    setplayercolumn,
  } = useUser(params.id as string);

  const move = (row: number[]) => {
    let playerindex: number;
    const newrow = row.map((value, index) => {
      if (value === 2) {
        playerindex = index + 1;
        return 0;
      } else if (index === playerindex) return 2;
      else return value;
    });

    return newrow;
  };

  const createNewmap = (row: number[]) => {
    const newmap: number[][] = stage.map((value) => {
      if (value.includes(2)) return row;
      else return value;
    });
    return newmap;
  };

  const playermove = (e: KeyboardEvent) => {
    const player = document.getElementById("player");
    if (player) {
      switch (e.key) {
        case "ArrowRight":
          if (
            playerrow[playerrow.length - 1] !== 2 &&
            playerrow[playerrow.indexOf(2) + 1] !== 1
          ) {
            player.style.left = String(parseInt(player.style.left) + 60) + "px";

            const newrow = move(playerrow);

            const newstage = createNewmap(newrow);
            setplayerrow(findplayerrow(newstage));
            setplayercolumn(findplayercolumn(newstage));
            setstage(newstage);
          }

          break;
        case "ArrowLeft":
          if (playerrow[0] !== 2 && playerrow[playerrow.indexOf(2) - 1] !== 1) {
            player.style.left = String(parseInt(player.style.left) - 60) + "px";

            const newrow = move(playerrow.reverse()).reverse();

            const newstage = createNewmap(newrow);
            setplayerrow(findplayerrow(newstage));
            setplayercolumn(findplayercolumn(newstage));
            setstage(newstage);
          }

          break;

        case "ArrowUp":
          if (
            !stage[0].includes(2) &&
            playercolumn[playercolumn.indexOf(2) - 1] !== 1
          ) {
            player.style.top = String(parseInt(player.style.top) - 60) + "px";
            const newcolumn = move(playercolumn.reverse()).reverse();
            const newstage = JSON.parse(JSON.stringify(stage));
            for (let i = 0; i < stage.length; i++) {
              newstage[i][playerrow.indexOf(2)] = newcolumn[i];
            }
            setplayercolumn(newcolumn);
            setplayerrow(findplayerrow(newstage));
            setstage(newstage);
          }

          break;
        case "ArrowDown":
          if (
            !stage[stage.length - 1].includes(2) &&
            playercolumn[playercolumn.indexOf(2) + 1] !== 1
          ) {
            player.style.top = String(parseInt(player.style.top) + 60) + "px";
            const newcolumn = move(playercolumn);
            const newstage = JSON.parse(JSON.stringify(stage));
            for (let i = 0; i < stage.length; i++) {
              newstage[i][playerrow.indexOf(2)] = newcolumn[i];
            }
            setplayercolumn(newcolumn);
            setplayerrow(findplayerrow(newstage));
            setstage(newstage);
          }

          break;
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", playermove);
    return () => {
      document.body.removeEventListener("keydown", playermove);
    };
  });

  if (error) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;

  return (
    <div className="w-screen h-screen bg-gray-700 flex flex-col items-center">
      <h1 className="text-3xl mt-3 text-white">ステージ{params.id}</h1>
      <p>ユーザーネーム: {data.username}</p>
      <div className="w-[1020px] h-[300px] bg-white flex flex-col relative">
        {stage.map((row, index) => {
          return (
            <div key={index} className="w-full h-[60px] flex">
              {row.map((value, index) => {
                return (
                  <div
                    key={index}
                    className={`w-[60px] h-[60px] ${
                      value === 1 && "bg-black"
                    } ${value === 3 && "bg-red-700"}`}
                  ></div>
                );
              })}
            </div>
          );
        })}
        <img
          style={{
            top: playercolumn.indexOf(2) * 60,
            left: playerrow.indexOf(2) * 60 + 10,
          }}
          className="w-[43px] absolute"
          src="/images/mario.png"
          alt=""
          id="player"
        />
      </div>
    </div>
  );
};

export default Stage;
