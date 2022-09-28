import { DataSource } from "apollo-datasource";

export interface Services {
  queryAll: () => any[];
}

class Tickets extends DataSource implements Services {
  queryAll() {
    return [];
  }
}

export default Tickets;
