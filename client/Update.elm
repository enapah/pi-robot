module Update exposing (update)

import Messages exposing (..)
import Socket exposing (send)
import Types exposing (..)

import Score.Update
import Table.Update

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    sendMessage = send model.websocketHost
  in
  case msg of
    ScoreMsg msg ->
      let
        (score, cmd) = Score.Update.update msg model.score
      in
        ({model | score = score}, Cmd.map ScoreMsg cmd)
    TableMsg msg ->
      let
        (table, cmd) = Table.Update.update msg model.table model.websocketHost
      in
        ({model | table = table}, Cmd.map TableMsg cmd)
    ChangeDelay delay ->
      let
        (newModel, cmd) = update (DelayChanged delay) model
      in
        newModel
        ! [cmd, DelayMessage delay |> sendMessage]
    CurrentColChanged currentCol ->
      {model | currentCol = currentCol}
      ! []
    DelayChanged delay ->
      {model | delay = delay}
      ! []
    Play ->
      let
        (newModel, cmd) = update (PlayingChanged True) model
      in
        newModel ! [Action "play" |> sendMessage]
    Pause ->
      let
        (newModel, cmd) = update (PlayingChanged False) model
      in
        newModel ! [Action "pause" |> sendMessage]
    Back ->
      model ! [Action "back" |> sendMessage]
    Forward ->
      model ! [Action "forward" |> sendMessage]
    PlayingChanged playing ->
      {model | playing = playing}
      ! []
    Error msg ->
      let
        errorLog = Debug.log "Error" msg
      in
        model ! []
