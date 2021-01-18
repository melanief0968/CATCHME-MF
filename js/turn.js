

function initTurn() {
 

  DATABASE.ref("Turn").on("value", (snap) => {
    let { who } = snap.val();

    if(ID === who)
    console.log('Your turn, mister', who);
 
    TURN = who;
    document.getElementById('yourturnPlayer').innerHTML = `It's your turn ${who}`;
    document.getElementById('notyourturn').innerHTML = " ";

    if(OTHER_ID === who) {
    // else{
      console.log(`It's${who}'s turn`);
      document.getElementById('notyourturn').innerHTML = `It's ${who}s turn`;
      document.getElementById('yourturnPlayer').innerHTML = " ";
    }
    // }
    // YOURTURN.classList.remove("hidden",`salut${who}`);
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

