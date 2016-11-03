module Messages exposing (..)

import Types exposing (..)
import Table.Types exposing (..)
import Score.Types exposing (..)
import Table.Messages
import Score.Messages

type SocketMessage = TableSocketMessage Table.Messages.SocketMessage |
                     CurrentColMessage Int |
                     DelayMessage Int |
                     Action String |
                     ScoreMessage Score |
                     PlayingMessage Bool

type Msg = TableMsg Table.Messages.Msg |
           ScoreMsg Score.Messages.Msg |
           CurrentColChanged Int |
           ChangeDelay Int |
           DelayChanged Int |
           Play |
           Pause |
           Back |
           Forward |
           PlayingChanged Bool |
           Error String
