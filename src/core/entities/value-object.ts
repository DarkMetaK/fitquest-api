export abstract class ValueObject<T> {
  protected props: T

  protected constructor(props: T) {
    this.props = props
  }

  public equals(obj: ValueObject<unknown>) {
    if (obj === null || obj === undefined) {
      return false
    }

    if (obj.props === undefined) {
      return false
    }

    return JSON.stringify(this.props) === JSON.stringify(obj.props)
  }
}
