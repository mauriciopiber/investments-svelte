import { inject, injectable } from "inversify";
import { TYPES } from "../containers/types";
import type {
  QueryPage,
  QuerySort,
  Repository,
  Service,
  Ticket,
} from "../types";

@injectable()
export class TicketsService implements Service<Ticket> {
  private _ticketRepository: Repository<Ticket>;

  constructor(
    @inject(TYPES.Ticket.Repository) ticketRepository: Repository<Ticket>
  ) {
    this._ticketRepository = ticketRepository;
  }

  async queryAll(page: QueryPage, sort: QuerySort) {
    const { current, perPage } = page;
    const { key, direction } = sort;

    const start = (current - 1) * perPage + 1;
    const end = current * perPage;

    const prev = current <= 1 ? null : current - 1;

    const items = await this._ticketRepository.queryAll(
      {},
      start - 1,
      perPage,
      key,
      direction
    );

    const total = await this._ticketRepository.count();

    const next =
      current >= parseInt((total / perPage).toString()) + 1
        ? null
        : current + 1;

    return {
      page: {
        current,
        items: items.length,
        start,
        end,
        next,
        prev,
        total: total,
      },
      items: items,
    };
  }
}
