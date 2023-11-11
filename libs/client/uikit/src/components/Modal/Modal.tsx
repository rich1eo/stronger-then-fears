import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { classNames } from '../../lib/classNames/classNames'
import { Portal } from '../Portal/Portal'

import styles from './Modal.module.css'

const ANIMATION_DELAY = 100

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  lazy?: boolean
  className?: string
}

export const Modal = ({ className, children, isOpen, lazy, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  const mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  }

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    timeRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, ANIMATION_DELAY)
  }, [onClose])

  const handleCloseOnEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  function handleContentClick(event: React.MouseEvent) {
    event.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleCloseOnEscKey)
    }

    return () => {
      clearTimeout(timeRef.current)

      window.removeEventListener('keydown', handleCloseOnEscKey)
    }
  }, [isOpen, handleCloseOnEscKey])

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [className])}>
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.content} onClick={handleContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
