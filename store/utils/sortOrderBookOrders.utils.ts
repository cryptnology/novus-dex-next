import { Contract, ethers } from "ethers";
import { get, groupBy, reject } from "lodash";
import moment from "moment";

const GREEN = "text-green-600";
const RED = "text-red-600";

const decorateOrder = (
  order: ethers.utils.Result | undefined,
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  const ether = "ether";

  let token0Amount: string, token1Amount: string;

  if (order?.tokenGive === tokens[1]?.token?.address) {
    token0Amount = order.amountGive;
    token1Amount = order.amountGet;
  } else {
    token0Amount = order?.amountGet;
    token1Amount = order?.amountGive;
  }

  const precision = 100000;
  const tokenPrice =
    Math.round((Number(token1Amount) / Number(token0Amount)) * precision) /
    precision;

  return {
    ...order,
    token0Amount: ethers.utils.formatUnits(token0Amount, ether),
    token1Amount: ethers.utils.formatUnits(token1Amount, ether),
    tokenPrice,
    formattedTimetamp: moment.unix(order?.timestamp).format("h:mm:ssa d MMM D"),
  };
};

const decorateOrderBookOrder = (
  order: any,
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  const buy = "buy";
  const sell = "sell";

  const orderType = order?.tokenGive === tokens[1].token.address ? buy : sell;

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === buy ? GREEN : RED,
    orderFillAction: orderType === buy ? sell : buy,
  };
};

const decorateOrderBookOrders = (
  orders: (ethers.utils.Result | undefined)[],
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  return orders.map((order) => {
    const decoratedOrder = decorateOrder(order, tokens);
    return decorateOrderBookOrder(decoratedOrder, tokens);
  });
};

const sortOrderBookOrders = (
  allOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  cancelledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
  filledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }
) => {
  let orders: (ethers.utils.Result | undefined)[];

  const openOrders = reject(allOrders.data, (order) => {
    const ordersFilled = filledOrders.data.some(
      (o) => o?.id.toString() === order?.id.toString()
    );
    const ordersCancelled = cancelledOrders.data.some(
      (o) => o?.id.toString() === order?.id.toString()
    );
    return ordersFilled || ordersCancelled;
  });

  orders = openOrders?.filter(
    (o) =>
      o?.tokenGet === tokens[0]?.token.address ||
      o?.tokenGet === tokens[1]?.token.address
  );

  orders = openOrders?.filter(
    (o) =>
      o?.tokenGive === tokens[0]?.token.address ||
      o?.tokenGive === tokens[1]?.token.address
  );

  // Group by "ordrType"
  const groupedOrders = groupBy(
    decorateOrderBookOrders(orders, tokens),
    "orderType"
  );

  // Fetch buy and sell orders
  const buyOrders = get(groupedOrders, "buy", []);
  const sellOrders = get(groupedOrders, "sell", []);

  return {
    buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
    sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  };
};

export default sortOrderBookOrders;
