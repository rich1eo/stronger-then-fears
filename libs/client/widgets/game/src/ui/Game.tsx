import * as PIXI from 'pixi.js'
import { memo, useMemo } from 'react'

import { Enemy } from '@hackathon-2023/client/features/enemy'
import { Weapon } from '@hackathon-2023/client/features/weapon'
import { Container, Stage, Text } from '@pixi/react'

import { formatTime } from '../utils/format-time'

import { Boxes } from './components/Boxes/Boxes'
import { Enemies } from './components/Enemies/Enemies'

import styles from './Game.module.css'

interface GameProps {
  enemies: Enemy[]
  points: number
  weapon: Weapon
  handleAddPoints: (point: number) => void
  handleKillEnemy: (name: string) => void
  handleSetEnemies: (enemies: Enemy[]) => void
  minutes: number
  seconds: number
}

export const Game = memo(
  ({ enemies, points, weapon, handleAddPoints, handleKillEnemy, handleSetEnemies, minutes, seconds }: GameProps) => {
    const textStyle = useMemo(() => new PIXI.TextStyle({ stroke: '#01d27e' }), [])

    return (
      <div className={styles.game}>
        <div className={styles.info}>
          <div className={styles.points}>
            <p>баллы</p>
            <p className={styles.pointsValue}>{points}</p>
          </div>
          <div className={styles.controllers}>
            <p className={styles.timer}>
              {formatTime(minutes)}:{formatTime(seconds)}
            </p>
          </div>
        </div>
        <Stage options={{ backgroundColor: '#6a6a6c' }} width={1180} height={600}>
          <Enemies
            handleSetEnemies={handleSetEnemies}
            stateEnemies={enemies}
            handleKillEnemy={handleKillEnemy}
            handleAddPoints={handleAddPoints}
            weapon={weapon}
          />

          <Boxes />
        </Stage>
      </div>
    )
  },
)
