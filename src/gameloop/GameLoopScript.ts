//@ts-nocheck
import loop from './GameLoop';

const canvas = document.getElementById("canvas");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

startButton!.addEventListener("click", loop.startGame);
stopButton!.addEventListener("click", loop.stopGame);
resetButton!.addEventListener("click", loop.resetGame);

