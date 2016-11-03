module Encode exposing (..)

import Json.Encode as Json exposing (..)

import Types exposing (..)
import Table.Types exposing (..)

encodeString : Cell -> String
encodeString {x, y, state} =
       object [
         ("x", int x),
         ("y", int y),
         ("state", string <| toString state)
       ] |> encode 0

encodeNumberOfCols numberOfCols = object [("numberOfCols", int numberOfCols)] |> encode 0

encodeDelay delay = object [("delay", int delay)] |> encode 0

encodeAction action = object [("action", string action)] |> encode 0
