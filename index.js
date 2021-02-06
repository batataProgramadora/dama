const ROW_SIZE=8;
var boardSize=8;

var moveColor="orange"

function countElements(array) {
  let contador=0;
  for (var variable in array) {
    contador++;
  }
  return contador;

}

class Board {
  static rowPieceBoard=new Array();
  static columnPieceBoard=new Array();

  static createPiece(row,column,color,dama,state){
    if (countElements(this.columnPieceBoard)<=4) {

      this.columnPieceBoard[column]=new Piece(row,column,color,dama,state);
    }else{
      this.columnPieceBoard=new Array()
      this.columnPieceBoard[column]=new Piece(row,column,color,dama,state);



    }
    this.rowPieceBoard[row]=this.columnPieceBoard;
  }


}

class Obstucle {
  #lockUpperLeft
  #lockUpperRight
  #lockBottomLeft
  #lockBottomRight

  constructor(){
    this.#lockUpperLeft=false;
    this.#lockUpperRight=false
    this.#lockBottomLeft=false
    this.#lockBottomRight=false

  }

  setUpperLeft(){
    this.#lockUpperLeft=true
  }
  setUpperRight(){
    this.#lockUpperRight=true
  }
  setBottomLeft(){
    this.#lockBottomLeft=true
  }
  setBottomRight(){
    this.#lockBottomRight=true
  }
  get getUpperLeft(){
    return this.#lockUpperLeft
  }
  get getUpperRight(){
    return this.#lockUpperRight
  }
  get getBottomRight(){
    return this.#lockBottomRight
  }
  get getBottomLeft(){
    return this.#lockBottomLeft
  }
  obstucleLoop(callback){
    Object.entries(this).forEach(callback([key,value]));

  }

  setBottom(){
    this.#lockBottomLeft=true
    this.#lockBottomRight=true
  }
  setUp(){
    this.#lockUpperLeft=false
    this.#lockUpperRight=false
  }

}

class Position {
  #row;
  #column;
  constructor(row,column) {
    this.#row=row;
    this.#column=column;
  }
  set setRow(newRow){
    this.#row=newRow
  }
  set setColumn(newColumn){
    this.#column=newColumn;
  }
  get getRow(){
    return this.#row
  }
  get getColumn(){
    return this.#column
  }
}
class Piece extends Position {
  #state;
  #color;
  #dama;
  #row;
  #column
  #orientation;
  #obstucle

  constructor(row,column,color="dark",dama=false,state=null) {
    super(row,column);
    this.#state=state;
    this.#color=color;
    this.#dama=dama;
    if (this.#row<=3) {
      this.#orientation="top"
    }else{
      this.#orientation="bottom";
    }
    this.#obstucle=new Obstucle()

  }
  set setPosition(newPosition){
    this.#row=newPosition[0];
    this.#column=newPosition[1]
  }
  set setDama(dama){
    if (this.#dama==false) {
      this.#dama=true;

    }
  }
  get getObstucle(){
    return this.#obstucle
  }
  get getColor(){
    return this.#color;
  }
  get getOrientation(){
    return this.#orientation;
  }
  get getDama(){
    return this.#dama;
  }
  get state(){
    return this.#state;
  }
  isInDamaPoint(){
    if (this.getOrientation=="top" && this.getRow==8) {
      return true;
    }else if (this.getOrientation=="bottom" && this.getRow==1) {
      return true


    }else{
      return false
    }
  }
  isInSpawnPoint(){
    if (this.getOrientation=="top" && this.getRow==1) {
      return true

    }else if (this.getOrientation=="bottom" && this.getRow==8) {
      return true
    }else{
      return false;
    }
  }
  isInLeftBorder(){
    if (this.getColumn==1) {
      return true

    }else{
      return false
    }
  }
  isInRightBorder(){
    if (this.getColumn==8) {
      return true

    }else{
      return false
    }
  }
  checkUpRowOperation(){
    let up
    if (this.getOrientation=="top") {
      up="+"
    }else{
      up="-"


    }
    return up
  }
  checkDownRowOperation(){
    let down
    if (this.getOrientation=="top") {
      down="-"

    }else{
      down="+"
    }
    return down
  }


  checkSlot(vertical,horizontal){
    let verticalOperation
    let nextRow;
    let row=this.getRow
    let column=this.getColumn
    let pieceFound;



    if (vertical=="down") {
      verticalOperation=this.checkDownRowOperation()

    }else{
      verticalOperation=this.checkUpRowOperation()

    }

    if (verticalOperation=="+") {
      nextRow=Board.rowPieceBoard[row+1]

    } else {
      nextRow=Board.rowPieceBoard[row-1]

    }

    if (nextRow!=undefined|| nextRow!=null) {

      if (horizontal=="right") {
        pieceFound=nextRow[column+1]

        if (pieceFound!=undefined || pieceFound!=null) {
          return pieceFound;

        }else{
          return false;
        }



      }else{
        pieceFound=nextRow[column-1]

        if (pieceFound!=undefined || pieceFound!=null) {
          return pieceFound;

        }else{
          return false;
        }

      }

    }else{
      return false

    }





  }









  setBoardLimit(){




    if (this.isInLeftBorder()==true) {
      this.getObstucle.setUpperLeft()
      this.getObstucle.setBottomLeft()

    }
    if (this.isInRightBorder()==true) {
      this.getObstucle.setUpperRight()
      this.getObstucle.setBottomRight()
    }

    if (this.getOrientation=="top") {
      if (this.getRow==8) {
        this.getObstucle.setBottom()




      }else if (this.getRow==1) {
        this.getObstucle.setUp()

      }


    }else if (this.getRow==1) {
      this.getObstucle.setBottom()

    }else if (this.getRow==8) {
      this.getObstucle.setUp()

    }





  }

  showMove(){
    let row=this.getRow
    let column=this.getColumn
    let pieces=new Map()



    this.setBoardLimit()

    if (this.getObstucle.getUpperLeft==false) {

        pieces.set("setUpperLeft",this.checkSlot("up","left"))
      }
      if (this.getObstucle.getUpperRight==false) {
        pieces.set("setUpperRight",this.checkSlot("up","right"))

      }



    if (this.getObstucle.getBottomLeft==false) {

        pieces.set("setBottomLeft",this.checkSlot("down","left"))

      }
      if (this.getObstucle.getBottomRight==false) {
        pieces.set("setBottomRight",this.checkSlot("down","right"))

      }




    pieces.forEach((item, i) => {
      if (item!=undefined || item!=null) {
        if (item.getColor==this.getColor) {
          this.getObstucle[i];

        }

      }

    });

    this.getObstucle.obstucleLoop(function([key,value]){
      if (value==true) {
        pieces.get(key)

      }
    })
















}



}





function pieceEvent(e) {
  let block=e.target.parentElement;
  let row=block.className.match(/r+\d/)[0].slice(1);
  let column=block.className.match(/c+\d/)[0].slice(1);
  Board.rowPieceBoard[row][column].showMove();


}

function blockEvent(e) {
  if (e.target.backgroundColor=="yellow") {

  }

}



var start=0;
var a=start;

for (var row = 1; row <=ROW_SIZE; row++) {
    let placePieces=false;
    let pieceColor="piece-light";
    if (row<=3) {

      placePieces=true;
    }else if (row>=6) {
      placePieces=true;
      pieceColor="piece-dark";

    }
    else{
      placePieces=false;
    }
    for (var column=1; a <boardSize; a++,column++) {
      let boardBlock=document.createElement("div");

      boardBlock.className="block";
      if (a%2==0) {
        boardBlock.className+=" dark";
        if (placePieces==true) {
          let piece=document.createElement("div");
          piece.className=`piece ${pieceColor}`
          Board.createPiece(row,column,pieceColor)
          boardBlock.appendChild(piece);
          piece.addEventListener("click",pieceEvent)

        }
      }else{
        boardBlock.className+=" light";

      }
      boardBlock.className+=` r${row} c${column} `;

      boardBlock.addEventListener("click",blockEvent);




      gameBoard.appendChild(boardBlock);
    }
    start++;
    a=start;
    boardSize++;


}
