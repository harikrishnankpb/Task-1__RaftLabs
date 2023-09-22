import { merge } from "lodash"

import UserResolver from "./resolvers/UserResolver";

const resolverMap = merge(
    UserResolver
);

export default resolverMap;