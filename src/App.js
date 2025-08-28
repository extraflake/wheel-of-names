import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState(null);
  const { width, height } = useWindowSize();
  let url = 'http://localhost:8989';

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    const res = await axios.get(`${url}/api/participant`);
    setParticipants(res.data);
  };

  const spinWheel = async () => {
    const res = await axios.get(`${url}/api/participant/winner`);
    const win = res.data;
    console.log(win)
    setWinner(win);

    const index = participants.findIndex(p => p.id === win.id);
    setPrizeNumber(index);
    setMustSpin(true);
    loadParticipants();
  };

  const data = participants.map(p => ({ option: p.name }));

  return (
    <div className="container mx-auto p-6">
      <div className="row">
        <div className="col-md-6">
          <div className="p-4 text-center">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data.length > 0 ? data : [{ option: "No Data" }]}
              backgroundColors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']}
              textColors={['#ffffff']}
              outerBorderColor="#333"
              outerBorderWidth={5}
              innerBorderColor="#333"
              innerBorderWidth={2}
              radiusLineColor="#fff"
              radiusLineWidth={2}
              fontSize={12}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />

            <div className="mt-4">
              <button
                onClick={spinWheel}
                className="bg-green-500 text-black px-4 py-2 mt-2"
              >
                Putar 🎯
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          {mustSpin !== true && winner !== null && (
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-6 text-center overflow-hidden">
              <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />

              <h1 className="text-3xl font-extrabold text-yellow-600 mb-6 flex items-center justify-center gap-3 animate-pulse">
                🎊 Selamat! 🎊
              </h1>

              <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 
                      border-4 border-yellow-400 rounded-2xl p-8 shadow-inner">
                <h3 className="text-6xl font-extrabold text-red-600 tracking-wide drop-shadow-2xl animate-bounce">
                  {winner.name} 🏆
                </h3>
              </div>

              <p className="mt-6 text-gray-700 italic text-lg">
                Kamu berhasil memenangkan undian 🎯🎉
              </p>

              <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
