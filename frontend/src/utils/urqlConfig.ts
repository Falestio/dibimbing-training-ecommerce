import { dedupExchange, cacheExchange, fetchExchange } from 'urql';

export const urqlConfig = {
    url: 'http://localhost:4000/graphql',
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
}