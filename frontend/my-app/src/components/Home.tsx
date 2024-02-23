import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Auth from "./Auth";
const stagenames = ["0", "1", "2", "3"];
const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div className="w-screen h-screen bg-gray-700 flex flex-col items-center">
          <h1 className="text-5xl text-red-400 mt-12">スーパーブラザース</h1>
          <div className=" h-46 mt-24 flex flex-col items-center ">
            <p className="text-gray-300">ステージ選択</p>
            <img className="w-[55px]" src="./images/mario.png" alt="" />

            <div className="w-16 h-8 relative overflow-hidden">
              <div
                id="stagebox"
                style={{ top: 0, left: 0 }}
                className=" w-64 h-8 flex absolute"
              >
                {stagenames.map((value) => {
                  return (
                    <p
                      className="w-16 h-full text-3xl flex justify-center items-center"
                      key={value}
                    >
                      {value}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-32 h-9 flex justify-between items-center mt-2">
              <FaArrowLeft
                onClick={() => {
                  const stagebox = document.getElementById("stagebox");

                  if (stagebox && parseInt(stagebox.style.left) !== 0) {
                    stagebox.style.left =
                      String(parseInt(stagebox.style.left) + 64) + "px";
                  }
                }}
                className="text-3xl"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const stagebox = document.getElementById("stagebox");
                  if (stagebox) {
                    const number = -parseInt(stagebox.style.left) / 64;
                    const stagename = stagenames[number];
                    navigate(`/stage/${stagename}`);
                  }
                }}
                className="w-12 h-9 rounded-xl text-white bg-blue-500"
              >
                進む
              </button>
              <FaArrowRight
                className="text-3xl"
                onClick={() => {
                  const stagebox = document.getElementById("stagebox");

                  if (stagebox && parseInt(stagebox.style.left) !== -192) {
                    stagebox.style.left =
                      String(parseInt(stagebox.style.left) - 64) + "px";
                  }
                }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              auth.signOut();
            }}
            className="w-18 h-9 mt-12 rounded-xl text-white bg-blue-500"
          >
            サインアウト
          </button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Home;
