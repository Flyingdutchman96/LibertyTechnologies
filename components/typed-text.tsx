"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface TypedTextProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
  loop?: boolean
  className?: string
}

const TypedText = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1000,
  loop = true,
  className = "",
}: TypedTextProps) => {
  const el = useRef<HTMLSpanElement>(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        showCursor: true,
        cursorChar: "|",
      })
    }

    return () => {
      typed.current?.destroy()
    }
  }, [strings, typeSpeed, backSpeed, backDelay, loop])

  return <span ref={el} className={className}></span>
}

export default TypedText
