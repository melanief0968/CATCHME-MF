document.addEventListener("click", sendmessage)

let counter = 0;

function sendmessage(){
    console.log("click");
    counter ++
    SEND_MESSAGE({x:counter, y:counter*2}, "Counter");
    SEND_MESSAGE(`salut${counter}`, "RANDOM");
}

