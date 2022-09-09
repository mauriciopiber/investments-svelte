export const STOCK_PAGE = `
query {
  sectors {
    name
    slug
    income {
      averageAmount
      averageYield
    }
    subSectors {
      name
      slug
      income {
        averageAmount
        averageYield
      }
      segments {
        name
        slug
        income {
          averageAmount
          averageYield
        }
        companies {
          name
          slug
          income {
            averageAmount
            averageYield
          }
          tickets {
            name
            slug
            income {

              range {
                averageIncome
                averageYield

              }

            }
          }
        }
      }
    }
  }
}`;
