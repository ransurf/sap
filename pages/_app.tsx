import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebaseConfig/init'
import {AnalyticsProvider} from 'use-analytics'
import analytics from '../utils/analytics'
import { useEffect } from 'react'
import onRouteChange from '@analytics/router-utils'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // run function on when all providers are finished loading
    //analytics.ready(()=>{
      analytics.page();
    //})
    // run function on route change
    onRouteChange(()=>{
      analytics.page()
    })
  }, [analytics])
  
  return(
    <AnalyticsProvider instance = { analytics }>
    <FirebaseProvider>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
    </FirebaseProvider>
    </AnalyticsProvider>
  )     
}
export default MyApp
