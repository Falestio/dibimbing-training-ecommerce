import { createClient } from 'urql';
import { urqlConfig } from './urqlConfig';

const client = createClient(urqlConfig);

export default client;
