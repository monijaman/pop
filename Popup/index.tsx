import {
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  useEffect,
  useRef,
  useState
} from 'react'
import { classNames } from '@utils/index'

export function Popup({
  action,
  children,
  className
}: {
  action?: string
  children: ((object) => ReactNode) | ReactNode
  className?: string
}) {
  const [handleLeft, setHandleLeft] = useState<number>(0)
  const [contentLeft, setContentLeft] = useState<number>(0)
  const [open, setOpen] = useState(false)

  const ref = useRef(null)
  const positionLeft = () => {
    if (ref.current !== null) {
      const component = ref.current as HTMLDivElement
      const handle = component.querySelector('.popupHandle')
      const content = component.querySelector('.popupContent')
      let newContentLeft = contentLeft
      if (typeof window !== 'undefined' && content && handle) {
        const distanceToLeftEdge = 20 - handle.getBoundingClientRect().left
        const distanceToRightEdge =
          window.innerWidth - 20 - handle.getBoundingClientRect().left
        const contentWidth = content.clientWidth
        const handleWidth = handle.clientWidth
        newContentLeft = Math.max(
          distanceToLeftEdge,
          Math.min(
            handleWidth / 2 - contentWidth / 2,
            distanceToRightEdge - contentWidth
          )
        )
        setContentLeft(newContentLeft)

        setHandleLeft(newContentLeft * -1 + handleWidth / 2 - 16)
      }
    }
  }
  useEffect(() => {
    positionLeft()
  }, [])

  const props: HTMLAttributes<HTMLDivElement> = {}
  const openUp = () => {
    positionLeft()
    setOpen(true)
  }
  if (action == 'click') {
    props.onMouseDown = (e) => {
      if ((e.target as Element).closest('.popupHandle')) {
        if (open) {
          setOpen(false)
        } else {
          openUp()
        }
      }
    }
    props.onFocus = openUp
    props.onBlur = (e) => {
      // Do not close if a child gains focus
      if (e.currentTarget !== null && e.relatedTarget !== null) {
        const currentTarget = e.currentTarget as Element
        const relatedTarget = e.relatedTarget as Element
        if (!currentTarget.contains(relatedTarget)) {
          setOpen(false)
        }
      } else {
        setOpen(false)
      }
    }
    props.tabIndex = 0
  } else {
    props.onMouseEnter = openUp
    props.onMouseLeave = () => setOpen(false)
  }
  return (
    <div
      className={classNames('popup-component', open && 'open', className)}
      ref={ref}
      data-action={action || 'hover'}
      {...props}
      style={
        {
          '--handleLeft': handleLeft.toString() + 'px',
          '--contentLeft': contentLeft.toString() + 'px'
        } as CSSProperties
      }
    >
      {typeof children === 'function'
        ? children({
            close: () => setOpen(false)
          })
        : children}
    </div>
  )
}

export function PopupContent({
  position,
  children
}: {
  position?: string
  children: ReactNode
}) {
  const [below, setBelow] = useState(position == 'below')
  const ref = useRef(null)
  useEffect(() => {
    if (!position && ref.current !== null) {
      const refCurrent = ref.current as HTMLDivElement
      const component = refCurrent.parentElement
      if (component !== null) {
        const scrollParent = component.closest(
          '.overflow-auto, .overflow-hidden'
        )

        if (typeof window !== 'undefined') {
          const flip = () => {
            const top =
              component.getBoundingClientRect().top -
              refCurrent.getBoundingClientRect().height
            setBelow(
              top <
                (scrollParent ? scrollParent.getBoundingClientRect().top : 0)
            )
          }
          ;(scrollParent || window).addEventListener('scroll', flip)
          window.addEventListener('resize', flip)
          flip()
        }
      }
    }
  }, [])

  return (
    <div
      className={classNames(below ? 'below' : 'above', 'popupContent')}
      ref={ref}
    >
      <div className="inner">{children}</div>
    </div>
  )
}

export function PopupHandle({ children }) {
  return <div className="popupHandle">{children}</div>
}
