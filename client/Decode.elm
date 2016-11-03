module Decode exposing (decodeMessage)

import Json.Decode as Json exposing (..)

import Messages exposing (..)
import Table.Messages
import Types exposing (..)
import Table.Types exposing (..)
import Score.Types exposing (..)

decodeMessage : String -> Result String SocketMessage
decodeMessage = Json.decodeString messageDecoder

messageDecoder : Json.Decoder SocketMessage
messageDecoder =
  Json.oneOf
    [
      map (\x -> TableSocketMessage <| Table.Messages.TableMessage x) tableDecoder,
      map (\x -> TableSocketMessage <| Table.Messages.CellMessage x) cellDecoder,
      map CurrentColMessage ("currentCol" := int),
      map DelayMessage ("delay" := int),
      map ScoreMessage scoreDecoder,
      map PlayingMessage ("playing" := bool)
    ]

tableDecoder : Decoder Table
tableDecoder = object2 Table
                 ("rows" := list rowDecoder)
                 ("numberOfCols" := int)

scoreDecoder : Decoder Score
scoreDecoder = object2 Score
                 ("tones" := list string)
                 ("availableTones" := list string)

rowDecoder : Decoder Row
rowDecoder = object4 Row
               ("cells" := list cellDecoder)
               ("color" := string)
               ("part" := string)
               ("y" := int)

cellDecoder : Decoder Cell
cellDecoder = object3 Cell
                ("x" := int)
                ("y" := int)
                ("state" := map cellState string)

cellState : String -> CellState
cellState state = if state == "On" then On else Off
