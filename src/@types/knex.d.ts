// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      date: string
      hour: string
      diet_compliant: string
      created_at: string
    }

    users: {
      id: string
      name: string
      email: string
      created_at: string
    }
  }
}
