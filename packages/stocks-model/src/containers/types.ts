export const TYPES = {
  Connection: Symbol.for("Connection"),
  Sector: {
    Repository: Symbol.for("SectorRepository"),
  },
  SubSector: {
    Repository: Symbol.for("SubSectorRepository"),
  },
  Segment: {
    Repository: Symbol.for("SegmentRepository"),
  },
  Company: {
    Repository: Symbol.for("CompanyRepository"),
  },
  Ticket: {
    Repository: Symbol.for("TicketRepository"),
    Service: Symbol.for("TicketService"),
  },
  Portfolio: {
    Repository: Symbol.for("PortfolioRepository"),
  },
  StocksSource: {
    Repository: Symbol.for("StocksSourceRepository"),
  },
  Profile: {
    Repository: Symbol.for("ProfileRepository"),
  },
};
