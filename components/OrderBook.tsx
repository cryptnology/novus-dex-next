import { RxCaretSort } from "react-icons/rx";
import { useExchangeStore, useTokensStore, sortOrderBookOrders } from "@/store";

const OrderBook = () => {
  const { contracts: tokens } = useTokensStore();
  const { allOrders, cancelledOrders, filledOrders } = useExchangeStore();

  const { buyOrders, sellOrders } = sortOrderBookOrders(
    allOrders,
    tokens,
    cancelledOrders,
    filledOrders
  );

  return (
    <div className="">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Order Book
      </h2>
      <div className="grid sm:flex gap-5">
        <table className="w-full text-left">
          <caption className="text-left font-semibold mb-2">Selling</caption>
          {sellOrders ? (
            <>
              <thead>
                <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                  <th className="">
                    <span className="flex">
                      {tokens && tokens[0]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {`${tokens && tokens[0]?.symbol} / ${
                        tokens && tokens[1]?.symbol
                      }`}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {tokens && tokens[1]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td>{order.token0Amount}</td>
                    <td>{order.token1Amount}</td>
                    <td className="text-red-600 dark:text-red-500 transition">
                      {order.tokenPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <caption>No sell orders</caption>
          )}
        </table>
        <table className="w-full text-left">
          <caption className="text-left font-semibold mb-2">Buying</caption>
          {buyOrders ? (
            <>
              <thead>
                <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                  <th>
                    <span className="flex">
                      {tokens && tokens[1]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {`${tokens && tokens[1]?.symbol} / ${
                        tokens && tokens[0]?.symbol
                      }`}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {tokens && tokens[0]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {buyOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td>{order.token0Amount}</td>
                    <td>{order.token1Amount}</td>
                    <td className="text-green-600 dark:text-green-400 transition">
                      {order.tokenPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <caption>No buy orders</caption>
          )}
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
