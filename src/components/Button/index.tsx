import React from 'react'
// https://levelup.gitconnected.com/create-more-extensible-react-components-with-the-as-prop-pattern-b79bcbcf4024
// https://stevekinney.github.io/react-and-typescript/polymorphic-components

type ButtonOwnProps<T extends React.ElementType = React.ElementType> = {
  as?: T
  children: React.ReactNode
  disabled?: boolean
  className?: string
  loading?: boolean
  style?: React.CSSProperties
  variant: string
}

// ButtonProps includes everything in ButtonOwnProps & combines that with
// everything that is in the React component the E represents, minus
// the ones that we define.
type ButtonProps<U extends React.ElementType> = ButtonOwnProps<U> &
  Omit<React.ComponentProps<U>, keyof ButtonOwnProps>

const defaultElement = 'button'

/* ========================================================================
                              Button
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
//   <Button
//     className='block mx-auto my-5 btn-sm'
//     variant='green'
//     style={{ border: '2px dashed red' }}
//     onClick={() => { alert('Clicked!') }}
//     // disabled
//     // loading
//   >Click Me</Button>
//
///////////////////////////////////////////////////////////////////////////

export function Button<E extends React.ElementType = typeof defaultElement>(
  props: ButtonProps<E>
): React.ReactElement | null {
  const {
    as: Component = defaultElement,
    className = '',
    loading = false,
    onClick,
    style = {},
    children,
    variant = 'blue',
    ...rest
  } = props

  // Anytime loading is true, set disabled to true as well.
  // In order to get around the following error,:
  //
  //   Error: Cannot add property disabled, object is not extensible.
  //
  // We need to avoid destructuring ...otherProps directly from props, and
  // instead use an intermediate ...rest. When a .btn is disabled, it will
  // apply opacity and remove pointer events.

  const otherProps: any = { ...rest }

  if ((Component === 'button' || Component === 'input') && loading === true) {
    otherProps.disabled = true
  }

  /* ======================
        getClasses()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // Gotcha:
  //
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  // The most important implication of how Tailwind extracts class names is that
  // it will only find classes that exist as complete unbroken strings in your source files.
  //
  // Unfortunately, Tailwind does not allow for dynamically injecting a color
  // name into a class string. In other words, bg-${variant}-500 WILL NOT WORK!
  // That said, suppose we created a custom .btn-red, .btn-orange, etc.
  // Internally, these classes use the @apply directive to apply 'complete, unbroken'
  // Tailwind class names. In this case, btn-${variant} WILL work. Why? Because
  // it's being used in conjunction with a custom class and not directly aplied
  // to a Tailwind class.
  //
  ///////////////////////////////////////////////////////////////////////////

  const getClasses = () => {
    let classes = 'btn'

    if (variant) {
      classes = `${classes} btn-${variant}`
    }

    if (className) {
      classes = `${classes} ${className}`
    }

    return classes
  }

  /* ======================
          return
  ====================== */

  return (
    <Component
      // This isn't really necessary, but is more of a failsafe.
      onClick={loading || otherProps?.disabled ? undefined : onClick}
      className={getClasses()}
      style={style}
      {...otherProps}
    >
      {loading && (
        <div
          className={`spinner-border spinner-border-sm${
            children ? ' mr-2' : ''
          }`}
          role='status'
        >
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {children}
    </Component>
  )
}
