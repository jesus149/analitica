export interface ISessionDatum {
  sucess: boolean;
  log_action: string;
  log_ip_user: string;
  log_date: string;
}

export class SessionDatum implements ISessionDatum {
  constructor(
    public sucess: boolean,
    public log_action: string,
    public log_ip_user: string,
    public log_date: string
  ) {}
}
