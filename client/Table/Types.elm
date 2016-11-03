module Table.Types exposing (..)

type alias Table = {
    rows: List Row,
    numberOfCols: Int
  }

type alias Row = {
    cells: List Cell,
    color: String,
    part: String,
    y: Int
  }

type alias Cell = {
    x: Int,
    y: Int,
    state: CellState
  }

type CellState = On | Off

switchState : CellState -> CellState
switchState state = if state == On then Off else On
