module Score.View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Score.Messages exposing (..)
import Score.Types exposing (..)
import Table.View

view : Score -> Html Msg
view score =
      (List.map (toneRow score.tones) <| List.reverse score.availableTones)
        |> List.map listItem
        |> ul [id "flex-container"]

listItem node = li [] [node]

toneRow tones tone =
  ul [
    classList [("tone-row", True)]
  ] <| (li [] [text tone])::(List.map (toneCell tone) tones)

toneCell currentTone tone = li [] [text (if currentTone == tone then "x" else "-")]
