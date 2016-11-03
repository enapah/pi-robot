module Table.View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Table.Messages exposing (..)
import Table.Types exposing (..)

view : Table -> Int -> Html Msg
view table currentCol =
      (header table.numberOfCols currentCol)::(List.map row table.rows)
        |> List.map listItem
        |> ul [id "flex-container"]

listItem node = li [] [node]

header : Int -> Int -> Html Msg
header numberOfCols currentCol = (li [] [])::(List.map (headerCell currentCol) [0..numberOfCols - 1])
  |> ul [classList [("header", True)]]

headerCell : Int -> Int -> Html Msg
headerCell currentCol col = li [classList [("current", currentCol == col)]] [text <| toString <| col + 1]

row : Row -> Html Msg
row {cells, color, part} =
  ul [
    classList [("part-row", True)],
    style [("backgroundColor", color)]
  ] <| (li [] [text part])::(List.map (cell color) cells)

cell : String -> Cell -> Html Msg
cell color cell =
  li [
    classList [("active", cell.state == On)],
    onClick <| ClickCell cell
  ] []
