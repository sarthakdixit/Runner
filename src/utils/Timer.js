export let seconds = 0
export let minutes = 0
export let hours = 0
let totalSeconds = 0

let intervalId = null

function actionTimer() {
    ++totalSeconds
    hours = Math.floor(totalSeconds /3600)
    minutes = Math.floor((totalSeconds - hours*3600)/60)
    seconds = totalSeconds - (hours*3600 + minutes*60)
}

export const startTimer = () => {
    intervalId = setInterval(actionTimer, 1000)
}

export const stopTimer = () => {
    if (intervalId)
      clearInterval(intervalId)
}

export const resetTimer = () => {
    seconds = 0
    minutes = 0
    hours = 0
    totalSeconds = 0
    intervalId = null
}