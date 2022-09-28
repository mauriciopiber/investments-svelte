import { QueryPage, QuerySort } from "@pibernetwork/stocks-model/src/types";
import { Services } from "src/services/tickets";

export interface DataSource {
  tickets: Services;
}

export interface QueryInput {
  page: QueryPage;
  sort: QuerySort;
}

export interface Query {
  input: QueryInput;
}
