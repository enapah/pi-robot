import Html.App exposing (programWithFlags)

import Messages exposing (Msg)
import Socket exposing (listen)
import Types exposing (Model)
import Table.Types exposing (Table)
import Score.Types exposing (Score)
import Update exposing (update)
import View exposing (view)

main : Program Flags
main = programWithFlags {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

type alias Flags = { websocketHost : String }

init : Flags -> (Model, Cmd Msg)
init flags = Model (Table [] 0) (Score [] []) 0 0 False flags.websocketHost ! []

subscriptions : Model -> Sub Msg
subscriptions model = listen model.websocketHost
