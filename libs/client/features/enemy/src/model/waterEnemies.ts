import { DamageType } from '@hackathon-2023/client/features/weapon'
import { Enemy } from './enemy'

interface WaterEnemyProps {
  x: number
  y: number
}

export class SimpleWaterEnemy extends Enemy {
  constructor({ x, y }: WaterEnemyProps) {
    super({ name: 'Water', image: 'water.png', x, y, speed: 1, health: 1, weakness: DamageType.Fire, points: 1 })
  }
}

export class FastWaterEnemy extends Enemy {
  constructor({ x, y }: WaterEnemyProps) {
    super({ name: 'Water', image: 'water.png', x, y, speed: 2, health: 1, weakness: DamageType.Fire, points: 2 })
  }
}

export class StrongWaterEnemy extends Enemy {
  constructor({ x, y }: WaterEnemyProps) {
    super({ name: 'Water', image: 'water.png', x, y, speed: 1, health: 2, weakness: DamageType.Fire, points: 2 })
  }
}
