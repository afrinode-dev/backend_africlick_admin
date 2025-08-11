const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();
const Transaction = require('../models/Transaction');

const {
  AIRTEL_BASE, CLIENT_ID, CLIENT_SECRET, COUNTRY, CURRENCY
} = process.env;

async function getAirtelToken() {
  const res = await axios.post(\`\${AIRTEL_BASE}/auth/oauth2/token\`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  });
  return res.data.access_token;
}

router.post('/recharge', auth, async (req, res) => {
  const { phone, amount } = req.body;
  try {
    const token = await getAirtelToken();
    const response = await axios.post(
      \`\${AIRTEL_BASE}/merchant/v1/payments/\`,
      {
        reference: \`ref-\${Date.now()}\`,
        subscriber: { country: COUNTRY, currency: CURRENCY, msisdn: phone },
        transaction: { amount, country: COUNTRY, currency: CURRENCY, id: \`txn-\${Date.now()}\` }
      },
      { headers: { Authorization: \`Bearer \${token}\` } }
    );
    await Transaction.create({ userId: req.user.id, type: 'recharge', amount, phone, status: 'done' });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur Airtel', error: err.message });
  }
});

router.post('/retirer', auth, async (req, res) => {
  const { phone, amount } = req.body;
  try {
    const token = await getAirtelToken();
    const response = await axios.post(\`\${AIRTEL_BASE}/disbursement/v1/send\`, {
      recipient: { country: COUNTRY, currency: CURRENCY, msisdn: phone },
      transaction: { amount, country: COUNTRY, currency: CURRENCY, id: \`txn-\${Date.now()}\` }
    }, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    await Transaction.create({ userId: req.user.id, type: 'recharge', amount, phone, status: 'done' });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur Airtel', error: err.message });
  }
});

module.exports = router;