import { app } from './app'
import { registerInactiveCustomerActivityCron } from './crons/register-inactive-customer-activity-cron'
import { env } from './env'

app.listen(
  {
    port: env.PORT,
    host: '0.0.0.0',
  },
  () => {
    registerInactiveCustomerActivityCron.start()
    console.log('🚀 HTTP Server Running!')
  },
)
