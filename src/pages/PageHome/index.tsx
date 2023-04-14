// Third-party imports...
import { useState } from 'react'
import { API } from 'aws-amplify'

// Custom imports
import { useTitle } from 'hooks'
import { HR, Title, Waves, Button } from 'components'

// This is the name of the API that we created earlier
// You can double-check the name by going to <rootDir>/amplify/backend/api (to see associated file name).
const apiName = 'amplifyRest1'
const customersPath = '/customers'

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Home')

  const [customerId, setCustomerId] = useState('')
  const [customers, setCustomers] = useState<any[]>([])

  // Function to fetch from our backend and update customers array
  function getCustomer() {
    ///////////////////////////////////////////////////////////////////////////
    //
    // Here we are calling the customerHandler() Lambda.
    // The Lambda is fairly dumb it merely takes in a customerId,
    // and gives you back a customer object:
    // { customerId: customerId, customerName: `Customer ${customerId}` }
    //
    ///////////////////////////////////////////////////////////////////////////

    // APIClass.get(
    //   apiName: string,
    //   path: string,
    //  init: { [key: string]: any }
    // ): Promise<any>
    API.get(apiName, `${customersPath}/${customerId}`, {})

      .then((res) => {
        console.log('res: ', res)

        const newCustomers = [...customers]

        newCustomers.push(res)

        setCustomers(newCustomers)

        setCustomerId('')

        return res
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  /* ======================
      renderCustomers()
  ====================== */

  const renderCustomers = () => {
    if (Array.isArray(customers) && customers.length > 0) {
      return (
        <section>
          <h5 className='text-blue-500 font-bold text-center'>Customer Data</h5>

          {customers.map((customer: any) => {
            return (
              <div
                key={customer?.customerId}
                className='mx-auto mb-4 p-3 bg-off-white border border-gray-200 rounded-lg'
                style={{ maxWidth: 600 }}
              >
                <p className='mb-1'>
                  <strong>Customer ID:</strong> {customer.customerId}
                </p>

                <p className='mb-0'>
                  <strong>Customer Name:</strong> {customer.customerName}
                </p>
              </div>
            )
          })}
        </section>
      )
    }

    return null
  }

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
        Home Page
      </Title>

      <HR style={{ marginBottom: 50 }} />

      <div
        className='mx-auto mb-4 p-3 bg-off-white border border-gray-200 rounded-lg'
        style={{ maxWidth: 600 }}
      >
        <div className='mb-4'>
          <input
            className='form-control form-control-sm'
            onChange={(e) => {
              setCustomerId(e.target.value)
            }}
            placeholder='Customer ID...'
            type='text'
            value={customerId}
          />
        </div>

        <Button
          className='block w-full btn-sm font-bold'
          onClick={getCustomer}
          variant='green'
        >
          Get Customer
        </Button>
      </div>

      {renderCustomers()}

      <Waves />
    </div>
  )
}

export default PageHome
