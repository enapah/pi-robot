module Score.Types exposing (..)

type alias Score = {
    tones: List Tone,
    availableTones: List Tone
  }

type alias Tone = String
