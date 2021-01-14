function initTurn() {
  DATABASE.ref("Turn").on("value", (snap) => {
    const { who } = snap.val();

    if(ID === who)
      console.log('Your turn, mister', who);
    TURN = who;
  });

  if (ID === "runner") setTurn("runner");
}

function swapTurn() {
  let turn = TURN === ID ? OTHER_ID : ID;
  setTurn(turn);
}

function setTurn(who) {
  SEND_MESSAGE({ who }, "Turn");
}
