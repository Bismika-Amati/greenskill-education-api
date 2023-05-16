export class ResponseEntity {
  constructor(partial: Partial<ResponseEntity>) {
    Object.assign(this, partial);
  }

  statusCode: number;
  message?: string;
  data: any;
  meta?: any;
}
