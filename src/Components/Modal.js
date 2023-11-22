import "./Modal.css";
const Modal = (props) => {
  const winnerName =
    props.winner_name !== "draw" ? `${props.winner_name} won!` : "It's a Tie!";
  return (
    <div className="modal_box">
      {/* <h3>{`${props.winner_name} won!`}</h3> */}
      {!props.resetStatus && <h3>{winnerName}</h3>}
      {!props.resetStatus && <p>X TAKES THE ROUND</p>}
      {props.resetStatus && <p>Do you want to quit ?</p>}
      <div className="btn">
        <button className="quit" onClick={props.home_page}>
          QUIT
        </button>
        {!props.resetStatus && (
          <button className="reset" onClick={props.reset}>
            NEXT ROUND
          </button>
        )}
        {props.resetStatus && (
          <button className="reset" onClick={props.replay}>
            PLAY AGAIN
          </button>
        )}
      </div>
    </div>
  );
};
export default Modal;
