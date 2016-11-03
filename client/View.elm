module View exposing (view)

import Html.App
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Messages exposing (..)
import Table.Messages
import Types exposing (..)
import Table.Types exposing (..)
import Score.View
import Table.View

view : Model -> Html Msg
view {table, score, delay, currentCol, playing} =
    div [] [
      Html.App.map TableMsg (Table.View.view table currentCol),
      Html.App.map ScoreMsg (Score.View.view score),
      label [style [("display", "block")]] [
        div [] [text "Number of columns"],
        [10, 20, 30, 40]
          |> List.map (numberOfColsButton table)
          |> buttonGroup
      ],
      label [style [("display", "block")]] [
        div [] [text "Interval"],
        [100, 200, 500]
          |> List.map (delayButton delay)
          |> buttonGroup
      ],
        [
          controlButton Back False "step-backward",
          controlButton Play (playing == True) "play",
          controlButton Pause (playing == False) "pause",
          controlButton Forward False "step-forward"
        ] |> buttonGroup
    ]

controlButton action active icon =
  button [
    action |> onClick,
    classList [
      ("btn btn-default", True),
      ("active", active)
    ],
    type' "button"
  ] [
    span [class <| "glyphicon glyphicon-" ++ icon] []
  ]

buttonGroup = div [class "btn-group"]

numberOfColsButton table numberOfCols =
  someButton table.numberOfCols numberOfCols
    (\x -> Table.Messages.ChangeNumberOfCols x |> TableMsg)

delayButton currentDelay delay =
  someButton currentDelay delay ChangeDelay

someButton currentValue newValue action =
  button [
    onClick <| action newValue,
    classList [
      ("btn btn-default", True),
      ("active", currentValue == newValue)
    ],
    type' "button"
  ] [text <| toString newValue]
