// Third-party imports...

// Custom imports
import { useTitle } from 'hooks'
import { HR, Title, Waves } from 'components'

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Home')

  /* ======================
          return
  ====================== */

  return (
    <div className='2xl:container flex-1 mx-auto w-full p-6'>
      <Title
        style={{
          marginBottom: 50,
          textAlign: 'center'
        }}
      >
        Home
      </Title>

      <HR style={{ marginBottom: 50 }} />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum...
      </p>

      <Waves />
    </div>
  )
}

export default PageHome
