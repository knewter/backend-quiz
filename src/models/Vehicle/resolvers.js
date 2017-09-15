import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
    vehicle: Resolvers.Query.get(Model)
  },
  Mutation: {
    createVehicle: (unusedFirstParameter, args) => {
      const { year, make, model, } = args.input
      const vehicles =
        db.get('Vehicle')

      const maxId =
        Math.max(...
          vehicles
            .map(v => v.id)
        )

      const id = maxId + 1

      const makes = {
        Acura: ['MDX', 'RDX', 'ILX'],
        Audi: ['A4', 'Q5', 'Q7'],
        BMW: ['325', '750'],
        Ford: ['Taurus', 'F150'],
        Honda: ['CR-V', 'Accord'],
        Jaguar: ['XJ', 'XF', 'XE'],
        Jeep: ['Grand Cherokee'],
        Toyota: ['RAV4', 'Corolla', 'Camry'],
      }

      const isValid = (make, model) => {
        return makes[make].includes(model)
      }

      if(isValid(make, model)){
        db.set('Vehicle', { year, make, model, id, })
        return {
          vehicle: {
            id,
            year,
            make,
            model,
          }
        }
      } else {
        throw new Error('nope')
      }
    }
  },
}
