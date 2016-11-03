module Table.Update exposing (update)

import Table.Socket exposing (send)
import Table.Types exposing (..)
import Table.Messages exposing (..)

update : Msg -> Table -> String -> (Table, Cmd Msg)
update msg table websocketHost =
  let
    sendMessage = send websocketHost
    rec newMsg = update newMsg table websocketHost
  in
  case msg of
    ClickCell cell ->
      let
        newCell = {cell | state = switchState cell.state}
        (newModel, cmd) = CellChanged newCell |> rec
      in
        newModel
        ! [cmd, CellMessage newCell |> sendMessage]
    ChangeNumberOfCols numberOfCols ->
      let
        (newModel, cmd) = NumberOfColsChanged numberOfCols |> rec
      in
        newModel
        ! [cmd, NumberOfColsMessage numberOfCols |> sendMessage]
    CellChanged cell ->
      updateCellInModel table cell
      ! []
    InitTable table ->
      table
      ! []
    NumberOfColsChanged numberOfCols ->
      {table | numberOfCols = numberOfCols}
      ! []

updateCellInModel : Table -> Cell -> Table
updateCellInModel table {x, y, state} =
  let
      updateRow row = if row.y == y then {row | cells = List.map updateCell row.cells} else row
      updateCell cell = if cell.x == x then {cell | state = state} else cell
  in
    {table | rows = List.map updateRow table.rows}
