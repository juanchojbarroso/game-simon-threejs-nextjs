import {
  objects3DEasy,
  objects3DMedium,
  objects3DHard,
} from "../shared/objets3D";

const difficultylevels = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

const difficultylevelsPositions = {
  EASY: objects3DEasy,
  MEDIUM: objects3DMedium,
  HARD: objects3DHard,
};

export {
  difficultylevels,
difficultylevelsPositions
}