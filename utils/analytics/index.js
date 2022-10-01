import Analytics from 'analytics'
// import { senseiAnalytics } from '../src/analytics'

// using David Wells Library - Write Key visible
const analytics = Analytics({
    app: "Damon-Sandbox",
    plugins: [
        DebuggerPlugin({
            xyz: '123'
        })
    ]
})
/* This is an example plugin/currently configured to console log information */
function DebuggerPlugin(userConfig = {}) {
    return {
      NAMESPACE: 'debugger',
      config: userConfig,
      initialize: ({ payload }) => {
        console.log('Plugins Initialized')
      },
      page: ({ payload }) => {
        console.log("page call sent to Segment", payload)
      },
      /* Track event */
      track: ({ payload }) => {
        console.log("track call sent to Segment")
      },
      /* Identify user */
      identify: ({ payload }) => {
        console.log("ID call sent to Segment")
      },
      loaded: () => {
        return true
      },
      ready: () => {
        console.log('analytics ready')
      }
    }
  }

export default analytics