import { Progress } from "antd";

const Analytics = ({ allTransaction = [] }) => {
  const categories = [
    "food",
    "transport",
    "housing",
    "insurance",
    "healthcare",
    "entertainment",
    "shopping",
    "personal-care",
    "education",
    "travel",
    "gifts-donations",
    "other",
  ];

  const totalTransaction = allTransaction.length;

  const totalCashTransaction = allTransaction.filter(
    (transaction) => transaction.paymentmethod === "cash"
  );
  const totalCreditTransaction = allTransaction.filter(
    (transaction) => transaction.paymentmethod === "credit card"
  );

  const totalCashPercentage =
    totalTransaction > 0
      ? (totalCashTransaction.length / totalTransaction) * 100
      : 0;
  const totalCreditPercentage =
    totalTransaction > 0
      ? (totalCreditTransaction.length / totalTransaction) * 100
      : 0;

  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalCashTurnover = totalCashTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalCreditCardTurnover = totalCreditTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  // Calculate category-wise breakdown for both cash and credit card transactions
  const categoryCashAmounts = categories.map((category) => {
    return {
      category,
      amount: totalCashTransaction
        .filter((transaction) => transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0),
    };
  });

  const categoryCreditCardAmounts = categories.map((category) => {
    return {
      category,
      amount: totalCreditTransaction
        .filter((transaction) => transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0),
    };
  });

  return (
    <div className="container">
      <div className="row mb-4">
        {/* Transactions Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Total Transactions: {totalTransaction}</div>
            <div className="card-body text-center">
              <h5 className="text-success">Cash Transactions: {totalCashTransaction.length}</h5>
              <h5 className="text-danger">Credit Card Transactions: {totalCreditTransaction.length}</h5>
              <div className="d-flex justify-content-center">
                <Progress type="circle" strokeColor={"green"} className="mx-2" percent={totalCashPercentage.toFixed(0)} />
                <Progress type="circle" strokeColor={"red"} className="mx-2" percent={totalCreditPercentage.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>

        {/* Turnover Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body text-center">
              <h5 className="text-success">Cash Turnover: {totalCashTurnover}</h5>
              <h5 className="text-danger">Credit Card Turnover: {totalCreditCardTurnover}</h5>
              <div className="d-flex justify-content-center">
                <Progress type="circle" strokeColor={"green"} className="mx-2" percent={((totalCashTurnover / totalTurnover) * 100).toFixed(0)} />
                <Progress type="circle" strokeColor={"red"} className="mx-2" percent={((totalCreditCardTurnover / totalTurnover) * 100).toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Breakdown */}
      <h4>Category-wise Breakdown</h4>
      <div className="row">
        {/* Cash Categories */}
        <div className="col-md-6 mb-4">
          <h5 className="text-success">Cash Transactions by Category</h5>
          {categoryCashAmounts.map(({ category, amount }) => (
            amount > 0 && (
              <div className="card mb-2" key={category}>
                <div className="card-body">
                  <h5 className="text-success">{category}</h5>
                  <Progress percent={((amount / totalCashTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          ))}
        </div>

        {/* Credit Card Categories */}
        <div className="col-md-6 mb-4">
          <h5 className="text-danger">Credit Card Transactions by Category</h5>
          {categoryCreditCardAmounts.map(({ category, amount }) => (
            amount > 0 && (
              <div className="card mb-2" key={category}>
                <div className="card-body">
                  <h5 className="text-danger">{category}</h5>
                  <Progress percent={((amount / totalCreditCardTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
