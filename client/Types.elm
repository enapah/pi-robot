module Types exposing (..)

import Score.Types exposing (..)
import Table.Types exposing (..)

type alias Model = {
    table: Table,
    score: Score,
    currentCol: Int,
    delay: Int,
    playing: Bool,
    websocketHost: String
  }
