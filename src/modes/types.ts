export enum GraviPopeBallLifeState {
  SPAWNED,
  DUXPO,
  DEAD,
  PRESSED,
}

export enum GraviPopeBallSkinType {
  COLOR,
  IMAGE,
  ANIMATED_IMAGE,
}

export type GraviPopeBallState = {
  id: string;
  lifeState: GraviPopeBallLifeState;

  movementVector: {x: number; y: number};
  pos: {x: number; y: number; gravityBase: number};
  vel: {x: number; y: number; velocityGain: number};

  aiHandler: (state?: GraviPopeBallState, delta?: number) => GraviPopeBallState;

  scale: number;

  rotation: {degree: number; direction: number};

  skin: {type: GraviPopeBallSkinType; color: string; image?: number};
};
