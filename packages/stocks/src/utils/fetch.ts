import { STATUS_INVEST_URL } from "./../constants";
import { parse, HTMLElement } from "node-html-parser";

export async function fetchTicketPage(ticket: string): Promise<HTMLElement> {
  const dividendsPage = await fetch(`${STATUS_INVEST_URL}/${ticket}`);
  const dividendsHTML = await dividendsPage.text();

  const parsedHTML: HTMLElement | null = parse(dividendsHTML);

  if (parsedHTML === null) {
    throw new Error(
      `Unexpected error: unable to parse page for ticket ${ticket}`
    );
  }

  return parsedHTML;
}
