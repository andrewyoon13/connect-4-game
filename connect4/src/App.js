import React from 'react';
import './App.css';

export default class App extends React.Component {
  state = {
    rows: 6,
    columns: 7,
    moves: [
      { x:0, y: 0, player: 'red'}
    ],
  };

  resetBoard = () => {                // Resets the board for new game
    this.setState ({ moves: [] });
  }

  getPiece = (x,y) => {               // pulls piece
    const list = this.state.moves.filter ((item) => {
      return (item.x === x && item.y === y);
    });
    return list[0];
  }

  checkForWin = (x, y, player) => {
    let xInARow = [{ x, y }];
    for (let column = x + 1; column < x + 4; column += 1) {
      const checkPiece = this.getPiece (column, y);
      if (checkPiece && checkPiece.player === player) {
        xInARow.push({x: column, y: y});
      } else {
        break;
      }
    }
    for (let column = x - 1; column > x - 4; column -= 1) {
      const checkPiece = this.getPiece (column, y);
      if (checkPiece && checkPiece.player === player) {
        xInARow.push({ x: column, y: y});
      } else {
        break;
      }
    }
    if (xInARow.length > 3) {
      this.setState ({ winner: player, xInARow});
      return true;
    }
    
    xInARow = [{ x, y }];
    for (let row = y + 1; row < y + 4; row += 1) {
      const checkPiece = this.getPiece (x, row);
      if (checkPiece && checkPiece.player === player) {
        xInARow.push({ x: x, y: row });
      } else {
        break;
      }
    }
    for (let row = y - 1; row > y - 4; row -= 1) {
      const checkPiece = this.getPiece (x, row);
      if (checkPiece && checkPiece.player === player) {
        xInARow.push({ x: x, y: row });
      } else {
        break;
      }
    }
    if (xInARow.length > 3) {
      this.setState ({ winner: player, xInARow});
      return true;
    }
  }

  addMove = (x,y) => {
    const { playerTurn } = this.state;
    const nextPlayerTurn = playerTurn === 'red' ? 'yellow' : 'red';
    this.setState ({ moves: this.state.moves.concat ( x, y, player: playerTurn ), playerTurn: nextPlayerTurn});
  }


  renderGameBoard() {
    const { rows, columns, winner } = this.state;
    const rowViews = [];

    for (let row = 0; row< this.state.rows; row += 1) {
      const columnViews = [];
      for (let column = 0; column < this.state.columns; columns += 1) {
        const piece = this.getPiece(column, row);
        columnViews.push(
          <div onClick = {() => {this.addMove (column, row)}} style = {{width: '8vw', height: '8vw', backgroundColor: 'w#00a8ff', display: 'flex', padding: 5}}>
            <div style = {{borderRadius: '50%', backgroundColor: 'white', flex: 1}}>
              {piece ? < div style = {{backgroundColor: piece.player, flew: 1, borderRadius: '50%'}}/> : undefined}
            </div>
          </div>
        );
      }
      rowViews.push(
        <div style = {{ display: 'flex', flexDirection: 'row' }}>
          {columnViews}
        </div>
      )
    }

    return (
      <div style = {{backgroundColor: 'red', display: 'flex', flexDirection: 'column'}}>
        {winner && <div style = {{ position: 'absolute', backgroundColor: 'rgba(0, 100, 0, .02)'}}>{'${winner} Wins!'}</div>}
        {rowViews}
      </div>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <div style = {style ? Object.assign ({}, styles.container, style) : styles.container}>
        <div>
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: 5,
  }
}