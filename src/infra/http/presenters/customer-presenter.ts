import { Customer } from '@/entities/customer'

export class CustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
    }
  }
}
