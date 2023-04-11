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

      <Waves />
    </div>
  )
}

export default PageHome
