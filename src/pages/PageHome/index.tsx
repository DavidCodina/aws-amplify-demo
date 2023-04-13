// Third-party imports...
import { useState } from 'react'

// Custom imports
import { useTitle } from 'hooks'
import { HR, Title, Waves, Button } from 'components'

import { API } from 'aws-amplify' //* New

//~ import awsExports from '../../aws-exports'

// This is the name of the API that we created earlier.
// You can double-check the name by going to <rootDir>/amplify/backend/api (to see associated file name).
const apiName = 'amplifyRest1' //* New
const customersPath = '/customers' //* New

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Home')

  /* ======================

  ====================== */
  //* New

  const [customerId, setCustomerId] = useState('')
  const [customers, setCustomers] = useState<any[]>([])

  // Function to fetch from our backend and update customers array
  function getCustomer(/* e: any */) {
    //! const customerId = e.input

    // Here we are calling the customerHandler() Lambda.
    // The Lambda is fairly dumb it merely takes in a customerId,
    // and gives you back a customer object:
    // { customerId: customerId, customerName: `Customer ${customerId}` }

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

        return res
      })
      .catch((err) => {
        console.log('err:', err)
      })
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
        Home
      </Title>

      <HR style={{ marginBottom: 50 }} />

      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum!!!
      </p> */}

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
          //! onClick={() => {
          //!   getCustomer(customerId)
          //! }}

          onClick={getCustomer}
          variant='green'
        >
          Get Customer
        </Button>
      </div>

      <h2 style={{ visibility: customers.length > 0 ? 'visible' : 'hidden' }}>
        Response
      </h2>

      {customers.map((customer: any) => {
        return (
          <div key={customer?.customerId}>
            <p>
              <strong>Customer ID:</strong> {customer.customerId}
            </p>

            <p>
              <strong>Customer Name:</strong> {customer.customerName}
            </p>
          </div>
        )
      })}

      <Waves />
    </div>
  )
}

export default PageHome
