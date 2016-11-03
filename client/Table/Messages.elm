module Table.Messages exposing (..)

import Table.Types exposing (..)

type SocketMessage = CellMessage Cell |
                     NumberOfColsMessage Int |
                     TableMessage Table

type Msg = ClickCell Cell |
           ChangeNumberOfCols Int |
           CellChanged Cell |
           InitTable Table |
           NumberOfColsChanged Int
