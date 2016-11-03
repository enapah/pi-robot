module Socket exposing (listen, send)

import Html.App
import WebSocket

import Decode exposing (decodeMessage)
import Encode exposing (..)
import Messages exposing (..)
import Table.Socket
import Score.Messages
import Table.Messages
import Types exposing (..)

listen : String -> Sub Msg
listen url = WebSocket.listen url <| recieve

recieve : String -> Msg
recieve str =
  case decodeMessage str of
      Ok msg ->
        case msg of
          ScoreMessage score -> ScoreMsg (Score.Messages.InitScore score)
          TableSocketMessage msg -> TableMsg (Table.Socket.recieve msg)
          CurrentColMessage currentCol -> CurrentColChanged currentCol
          DelayMessage delay -> DelayChanged delay
          PlayingMessage playing -> PlayingChanged playing
          _ -> Error "not supported"
      Err msg -> Error msg

send : String -> SocketMessage -> Cmd Msg
send url msg =
  case msg of
    Action action -> encodeAction action |> WebSocket.send url
    DelayMessage delay -> encodeDelay delay |> WebSocket.send url
    _ -> Cmd.batch []
