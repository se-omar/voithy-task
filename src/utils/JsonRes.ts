export function jsonRes (data: object, message?: string) {
  return {
    message,
    data
  }
}
