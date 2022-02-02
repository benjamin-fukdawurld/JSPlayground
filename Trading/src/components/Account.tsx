import React, { useState } from "react";

type Props = {};

type State = {
  wallet: number;
  positions: {
    market: string;
    value: number;
    enterPrice: number;
    amount: number;
    currentRisk: number;
  }[];
  globalRisk: number;
  localRisk: number;
};

interface TradeAmountOptions {
  position: number;
  stopLoss: number;
  localRisk: number;
  fee: (value: number, amount: number) => number;
}

function getTradeAmount({ position, stopLoss, localRisk, fee }: TradeAmountOptions): number {
  const deltaPrice = position - stopLoss;
  const unitCost = deltaPrice + fee(position, 1) + fee(stopLoss, 1);

  return localRisk / unitCost;
}

function getTradeDeadPoint(
  enterPrice: number,
  amount: number,
  enterFee: number,
  fee: (value: number, amount: number) => number
) {
  const cost = enterPrice * amount + enterFee;
  return (cost + fee(cost, amount)) / amount;
}

function Account({}: Props) {
  const [accountState, setAccountState] = useState<State>({
    wallet: 100,
    positions: [],
    globalRisk: 0.06,
    localRisk: 0.02,
  });

  return (
    <div>
      {getTradeAmount({
        position: 25,
        stopLoss: 21,
        localRisk: 2000,
        fee: (value, amount) => value * amount * 1.01,
      })}
    </div>
  );
}

export default Account;
