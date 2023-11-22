import { useContext } from "react";
import "./GamePage.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import SymbolContext from "./SymboLContext";
// const a = useContext(SymbolContext);
// const players = {
//   CPU: {
//     SYM: a.nonselectsymbol,
//     NAME: "CPU",
//   },
//   HUMAN: {
//     SYM: a.selectsymbol,
//     NAME: "You",
//   },
// };

const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const GamePage = (props) => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCPUNext, setIsCPUNext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setcpuScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [replay, setReplayActive] = useState(false);

  // const score = {
  //   userScore: userScore,
  //   cpuScore: cpuScore,
  //   tieScore: tieScore,
  // };
  const a = useContext(SymbolContext);
  const players = {
    CPU: {
      SYM: a.nonselectsymbol,
      NAME: "CPU",
    },
    HUMAN: {
      SYM: a.selectsymbol,
      NAME: "You",
    },
  };

  localStorage.setItem("userScore", JSON.stringify(userScore));
  localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
  localStorage.setItem("tieScore", JSON.stringify(tieScore));

  const playFn = (arrayIndex, index) => {
    if (isCPUNext) return;
    if (winner) return;
    board[arrayIndex][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(true);
  };

  useEffect(() => {
    if (winner) return;
    if (isCPUNext) {
      cPUPlay();
    }
  }, [isCPUNext]);

  const cPUPlay = () => {
    if (winner) return;
    sleep(1000);
    // if ((board[0][0] === "X" && board[0][1]) === "X") {
    //   board[0][2] = players?.CPU?.SYM;
    //   setBoard((board) => [...board]);
    //   checkWinner();
    //   setIsCPUNext(false);
    //   return;
    // }
    // } else if ((board[0][0] === "X" && board[0][2]) === "X") {
    //   board[0][1] = players?.CPU?.SYM;
    // } else if ((board[0][1] === "X" && board[0][2]) === "X") {
    //   board[0][0] = players?.CPU?.SYM;
    // } else if ((board[1][0] === "X" && board[1][1]) === "X") {
    //   board[1][2] = players?.CPU?.SYM;
    // } else if ((board[1][0] === "X" && board[1][2]) === "X") {
    //   board[1][1] = players?.CPU?.SYM;
    // } else if ((board[1][1] === "X" && board[1][2]) === "X") {
    //   board[1][0] = players?.CPU?.SYM;
    // } else if ((board[2][0] === "X" && board[2][1]) === "X") {
    //   board[2][2] = players?.CPU?.SYM;
    // } else if ((board[2][0] === "X" && board[2][2]) === "X") {
    //   board[2][1] = players?.CPU?.SYM;
    // } else if ((board[2][1] === "X" && board[2][2]) === "X") {
    //   board[2][0] = players?.CPU?.SYM;
    // } else if ((board[0][0] === "X" && board[1][0]) === "X") {
    //   board[2][0] = players?.CPU?.SYM;
    // } else if ((board[0][0] === "X" && board[2][0]) === "X") {
    //   board[1][0] = players?.CPU?.SYM;
    // } else if ((board[1][0] === "X" && board[2][0]) === "X") {
    //   board[0][0] = players?.CPU?.SYM;
    // } else if ((board[0][1] === "X" && board[1][1]) === "X") {
    //   board[2][1] = players?.CPU?.SYM;
    // } else if ((board[0][1] === "X" && board[2][1]) === "X") {
    //   board[1][1] = players?.CPU?.SYM;
    // } else if ((board[1][1] === "X" && board[2][1]) === "X") {
    //   board[0][1] = players?.CPU?.SYM;
    // } else if ((board[0][2] === "X" && board[1][2]) === "X") {
    //   board[2][2] = players?.CPU?.SYM;
    // } else if ((board[0][2] === "X" && board[2][2]) === "X") {
    //   board[1][2] = players?.CPU?.SYM;
    // } else if ((board[1][2] === "X" && board[2][2]) === "X") {
    //   board[0][2] = players?.CPU?.SYM;
    // } else if ((board[1][1] === "X" && board[2][2]) === "X") {
    //   board[0][0] = players?.CPU?.SYM;
    // } else if ((board[1][1] === "X" && board[0][0]) === "X") {
    //   board[2][2] = players?.CPU?.SYM;
    // } else if ((board[2][2] === "X" && board[0][0]) === "X") {
    //   board[1][1] = players?.CPU?.SYM;
    // } else if ((board[0][2] === "X" && board[2][0]) === "X") {
    //   board[1][1] = players?.CPU?.SYM;
    // } else if ((board[0][2] === "X" && board[1][1]) === "X") {
    //   board[2][0] = players?.CPU?.SYM;
    // } else if ((board[1][1] === "X" && board[2][0]) === "X") {
    //   board[0][2] = players?.CPU?.SYM;
    // }

    const cPUMove = getCPUTurn();

    board[cPUMove.arrayIndex][cPUMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(false);
  };

  const getCPUTurn = () => {
    const emptyIndexes = [];
    board.forEach((row, arrayIndex) => {
      row.forEach((cell, index) => {
        if (cell === "") {
          emptyIndexes.push({ arrayIndex, index });
        }
      });
    });

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  };

  const checkWinner = () => {
    // check same row
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        const score = JSON.parse(localStorage.getItem("cpuScore"));
        setcpuScore(score + 1);
        localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
        setShowModal(true);
        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        const score = JSON.parse(localStorage.getItem("userScore"));
        setUserScore(score + 1);
        localStorage.setItem("userScore", JSON.stringify(userScore));
        setShowModal(true);
        return;
      }
    }

    // check same column
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        const score = JSON.parse(localStorage.getItem("cpuScore"));
        setcpuScore(score + 1);
        localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
        setShowModal(true);
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        const score = JSON.parse(localStorage.getItem("userScore"));
        setUserScore(score + 1);
        localStorage.setItem("userScore", JSON.stringify(userScore));
        setShowModal(true);
        return;
      }
    }

    // check same diagonal
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      const score = JSON.parse(localStorage.getItem("cpuScore"));
      setcpuScore(score + 1);
      localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
      setShowModal(true);
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      const score = JSON.parse(localStorage.getItem("userScore"));
      setUserScore(score + 1);
      localStorage.setItem("userScore", JSON.stringify(userScore));
      setShowModal(true);
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      const score = JSON.parse(localStorage.getItem("cpuScore"));
      setcpuScore(score + 1);
      localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
      setShowModal(true);
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      const score = JSON.parse(localStorage.getItem("userScore"));
      setUserScore(score + 1);
      localStorage.setItem("userScore", JSON.stringify(userScore));
      setShowModal(true);
      return;
    } else if (board.flat().every((cell) => cell !== "")) {
      setWinner("draw");
      const score = JSON.parse(localStorage.getItem("tieScore"));
      setTieScore(score + 1);
      localStorage.setItem("tieScore", JSON.stringify(tieScore));
      setShowModal(true);
      return;
    } else {
      setWinner(null);
      return;
    }
  };

  function displayTurn() {
    if (isCPUNext) {
      return `${players?.CPU?.SYM} TURN`;
    } else {
      return `${players?.HUMAN?.SYM} TURN`;
    }
  }

  const playAgainFn = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setShowModal(false);
    setWinner(null);
    setIsCPUNext(false);
  };

  const replayAgainFn = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setShowModal(false);
    setWinner(null);
    setIsCPUNext(false);
    setReplayActive(false);
    setcpuScore(0);
    localStorage.setItem("cpuScore", JSON.stringify(cpuScore));
    setUserScore(0);
    localStorage.setItem("userScore", JSON.stringify(userScore));
    setTieScore(0);
    localStorage.setItem("tieScore", JSON.stringify(tieScore));
  };

  //   const displayWinner = () => {
  //     if (winner === "draw") {
  //       return "It's a draw!";
  //     } else if (winner) {
  //       return `${winner} won!`;
  //     }
  //   };
  const replayActive = () => {
    setReplayActive(true);
    setShowModal(true);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="upper">
          <div className="game_name">
            <h2 className="cross">x</h2>
            <h2 className="zero">o</h2>
          </div>
          <div className="turn_name">{!winner && displayTurn()}</div>
          <div className="restart">
            <img src="./images/Vector (2).svg" onClick={replayActive}></img>
          </div>
        </div>
        <div className="grid">
          <div className="col">
            <span onClick={() => playFn(0, 0)} className="cell">
              {board[0][0]}
            </span>
            <span onClick={() => playFn(0, 1)} className="cell">
              {board[0][1]}
            </span>
            <span onClick={() => playFn(0, 2)} className="cell">
              {board[0][2]}
            </span>
          </div>
          <div className="col">
            <span onClick={() => playFn(1, 0)} className="cell">
              {board[1][0]}
            </span>
            <span onClick={() => playFn(1, 1)} className="cell">
              {board[1][1]}
            </span>
            <span onClick={() => playFn(1, 2)} className="cell">
              {board[1][2]}
            </span>
          </div>
          <div className="col">
            <span onClick={() => playFn(2, 0)} className="cell">
              {board[2][0]}
            </span>
            <span onClick={() => playFn(2, 1)} className="cell">
              {board[2][1]}
            </span>
            <span onClick={() => playFn(2, 2)} className="cell">
              {board[2][2]}
            </span>
          </div>
        </div>
        <div className="score_board">
          <div className="user_score">
            <h4>{players?.HUMAN?.SYM}(YOU)</h4>
            <p>{userScore}</p>
          </div>
          <div className="tie_score">
            <h4>TIES</h4>
            <p>{tieScore}</p>
          </div>
          <div className="cpu_score">
            <h4>{players?.CPU?.SYM}(CPU)</h4>
            <p>{cpuScore}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          reset={playAgainFn}
          winner_name={winner}
          home_page={props.disableGame}
          resetStatus={replay}
          replay={replayAgainFn}
        />
      )}
    </div>
  );
};
export default GamePage;
