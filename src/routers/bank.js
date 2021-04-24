const express = require("express");
const Client = require("../models/client");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const { deposit, updateCredit, withdraw, transfer } = require("./utills");
// new Date().toLocaleString()

const router = new express.Router();
//TODO make name unique
router.get("/", async (req, res) => {
  res.send(Account);
});
//Create a new client+account
router.post("/create-client", async (req, res) => {
  const { clientDetails, accountDetails } = req.body;
  try {
    const client = new Client(clientDetails);
    await client.save();
    const { _id } = client;
    const account = new Account({ owner: _id, ...accountDetails });
    await account.save();
    res.status(201).send(`new client ${_id} was created successfully
    account number ${account._id}`);
  } catch (e) {
    res.status(404).send(e);
  }
});
//Create a new account for an existing client

router.post("/create-account", async (req, res) => {
  try {
    const client = await Client.findById(req.body.owner);

    if (!client) {
      return res.status(404).send(`no client with an id of ${req.body.owner}`);
    }
    const account = await new Account(req.body);
    await account.save();
    res.status(201).send(account);
  } catch (e) {
    res.status(500).send(e);
  }
});
// deposit
router.patch("/deposit", async (req, res) => {
  const { sum, accountId, action } = req.body;
  try {
    await deposit(sum, accountId, action);
    res.status(201).send("ok");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
// update credit
router.patch("/credit", async (req, res) => {
  const { sum, accountId, action } = req.body;
  try {
    await updateCredit(sum, accountId, action);
    res.status(201).send("ok");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//withdraw money
// TODO add validation
router.patch("/withdraw", async (req, res) => {
  const { sum, accountId, action } = req.body;
  try {
    await withdraw(sum, accountId, action);
    res.status(201).send("ok");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//transferring money

router.patch("/transfer", async (req, res) => {
  const { sum, to_accountId, from_accountId, action } = req.body;
  try {
    await transfer(sum, to_accountId, from_accountId, action);
    res.status(201).send("ok");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//get client details
router.get("/account/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const account = await Account.findById(_id);
    if (!account) {
      return res.status(404).send("no such client");
    }
    res.send(account);
  } catch (e) {
    res.status(500).send("not a valid id");
  }
});
//get all clients details
router.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.find({});
    if (!accounts) {
      return res.status(404).send("no clients available");
    }
    res.send(accounts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
//get users by cash
router.get("/accounts/filter-by-cash", async (req, res) => {
  const { min, max } = req.query;
  Account.where("cash")
    .gte(parseInt(min))
    .lte(parseInt(max))
    .exec((err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    });
});

//get users by cash
router.get("/accounts/filter-by-credit", async (req, res) => {
  const { min, max } = req.query;
  Account.where("credit")
    .gte(parseInt(min))
    .lte(parseInt(max))
    .exec((err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    });
});

// get by clients
router.get("/accounts/filter-by-clients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const accounts = await Account.find({ owner: id });
    if (accounts.length === 0) {
      return res.status(404).send("no clients available");
    }
    res.send(accounts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
module.exports = router;
