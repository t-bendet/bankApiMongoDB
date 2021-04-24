const Client = require("../models/client");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

const deposit = async (sum, accountId, action) => {
  try {
    const deposit = await Account.findByIdAndUpdate(accountId, {
      $inc: { cash: sum },
    });
    const transaction = new Transaction({ sum, accountId, action });
    transaction.save();
  } catch (e) {
    throw new Error("action not available");
  }
};

const updateCredit = async (sum, accountId, action) => {
  try {
    const update = await Account.findByIdAndUpdate(accountId, {
      $inc: { credit: sum },
    });
    const transaction = new Transaction({ sum, accountId, action });
    await transaction.save();
  } catch (e) {
    throw new Error("action not available");
  }
};

const withdraw = async (sum, accountId, action) => {
  try {
    const withdraw = await Account.findByIdAndUpdate(accountId, {
      $inc: { cash: -sum },
    });
    const transaction = new Transaction({ sum, accountId, action });
    transaction.save();
  } catch (e) {
    throw new Error("action not available");
  }
};

// transfer

const transfer = async (sum, to_accountId, from_accountId, action) => {
  try {
    const fromAccount = await Account.findById(from_accountId);
    const toAccount = await Account.findById(to_accountId);
    if (fromAccount.cash + fromAccount.credit >= sum) {
      await Account.findByIdAndUpdate(from_accountId, {
        $inc: { cash: -sum },
      });
      await Account.findByIdAndUpdate(to_accountId, {
        $inc: { cash: sum },
      });
      const transaction1 = new Transaction({
        sum,
        accountId: from_accountId,
        action: `transferred ${sum} to client ${to_accountId}`,
      });
      await transaction1.save();
      const transaction2 = new Transaction({
        sum,
        accountId: to_accountId,
        action: `received ${sum} from client ${from_accountId}`,
      });
      await transaction2.save();
    } else {
      throw new Error("action not available");
    }
  } catch (e) {
    throw new Error("action not available");
  }
};

module.exports = { deposit, updateCredit, withdraw, transfer };
