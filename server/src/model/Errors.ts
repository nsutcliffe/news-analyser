export class RateLimitError extends Error {
  constructor(message: string = "Rate limit exceeded") {
    super(message);
    this.name = "RateLimitError";
  }
}

export class ConnectivityError extends Error {
  constructor(message: string = "Connectivity issue") {
    super(message);
    this.name = "ConnectivityError";
  }
}
