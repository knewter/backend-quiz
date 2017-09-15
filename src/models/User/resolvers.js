import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'

const concat = (x, y) =>
  x.concat(y)

const flatMap = (f, xs) =>
  xs.map(f).reduce(concat, [])

export default {
  Query: {
    users: Resolvers.Query.list(Model),
    user: Resolvers.Query.get(Model),
    profitableUsers: (obj, args, context) => {
      const vehicles = db.get('Vehicle')
      const orders = db.get('Order')
      const users = db.get('User')

      const vehiclesForUser = (userId) => {
        return vehicles
          .filter(v => v.userId === userId)
      }
      const ordersForVehicle = (vehicleId) => {
        return orders
          .filter(o => o.vehicleId === vehicleId)
      }
      const ordersForUser = (userId) => {
        return flatMap(
          v => ordersForVehicle(v.id),
          vehiclesForUser(userId)
        )
      }
      const spendForUser = (userId) => {
        return ordersForUser(userId)
          .map(o => {
            return o.price
          })
          .reduce((a, b) => a+b, 0)
      }

      const usersWithSpend =
        users
          .map(u => {
            return {
              spend: spendForUser(u.id),
              user: u
            }
          })

      const compareSpend = (a, b) => {
        if (a.spend < b.spend) {
          return -1;
        }
        if (a.spend > b.spend) {
          return 1;
        }
        return 0;
      }

      return usersWithSpend
        .sort(compareSpend)
        .reverse()
        .slice(0, args.top)
    }
  },
  Mutation: {
    deleteUser: Resolvers.Mutation.delete(Model),
  },
  User: {
    vehicles: (obj, args, context) => {
      return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
    },
  },
}
