module Table.Socket exposing (recieve, send)

import WebSocket

import Encode exposing (encodeString, encodeNumberOfCols)
import Table.Messages exposing (..)
import Types exposing (..)

recieve msg =
  case msg of
    CellMessage cell ->
      CellChanged cell
    TableMessage table ->
      InitTable table
    NumberOfColsMessage numberOfCols ->
      NumberOfColsChanged numberOfCols

send : String -> SocketMessage -> Cmd Msg
send url msg =
  let
    send = WebSocket.send url
  in
    case msg of
      CellMessage cell ->
        encodeString cell |> send
      NumberOfColsMessage numberOfCols ->
        encodeNumberOfCols numberOfCols |> send
      _ -> Cmd.batch []
