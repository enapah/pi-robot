module Score.Update exposing (update)

import Score.Messages exposing (..)

update msg score =
  case msg of
    InitScore score ->
      score
      ! []
