class Displacement {
    constructor(listOfPawns) {
        if(ID == "catcher"){
            this.selectablePawns = listOfPawns.slice(0,3);
        }
        if(ID == "runner"){
            this.selectablePawns = listOfPawns.slice(3,4);
        }


        this.listOfPawns = listOfPawns;
        this.currentPlayer;
        this.currentPawn = null;
  

        for (let pawn of this.selectablePawns) {
            pawn.elem.addEventListener("click", (e) => {
                this.select(pawn);
            });
            pawn.refreshPos();
        }
        this.select(null);
    }

    select(selectedPawn) {
        for (let pawn of this.listOfPawns) {
            pawn.select(false)
        }
        if(selectedPawn != null) {
            if(selectedPawn == this.currentPawn) {
                this.currentPawn = null;
            }
            else {
                this.currentPawn = selectedPawn;
                selectedPawn.select(true);
            } 
        }
        else {
            this.currentPawn = null;
        }
    }

    refreshPlayersPos() {
        for (let pawn of this.listOfPawns) {
            pawn.refreshPos()
        }
    }
    // updateDatabase() {
    //     SEND_MESSAGE(DIRECTION, DIRECTION_ID)
    //   }
    
}