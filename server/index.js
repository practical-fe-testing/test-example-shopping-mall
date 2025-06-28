import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import productsJSON from './response/products.json' assert { type: 'json' };
import categoriesJSON from './response/categories.json' assert { type: 'json' };
import couponListJSON from './response/couponList.json' assert { type: 'json' };
import usersJSON from './response/users.json' assert { type: 'json' };

dotenv.config();

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const __dirname = path.resolve();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// 1/10 확률로 실패
const result = [...new Array(9).fill(true), false];
function getResult() {
  return result[Math.floor(Math.random() * result.length)];
}

function getProductsByCategoryId(products, categoryId) {
  const numberCategoryId = Number(categoryId);

  return numberCategoryId > 0 && numberCategoryId < 6
    ? products.filter((item) => item.category.id === numberCategoryId)
    : products;
}

function getProductsByPrice(products, price) {
  return price ? products.filter((item) => item.price === Number(price)) : products;
}

function getProductsByPriceRange({ products, minPrice, maxPrice }) {
  const minValue = minPrice ? Number(minPrice) : Number.MIN_SAFE_INTEGER;
  const maxValue = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;

  return products.filter((item) => item.price >= minValue && item.price <= maxValue);
}

function getProductsByTitle(products, title) {
  return title ? products.filter((item) => item.title.includes(title)) : products;
}

function getFilteredProductsByQuery(products, query) {
  const productsFilteredByCategoryId = getProductsByCategoryId(products, query.categoryId);
  const productsFilteredByPriceRange = getProductsByPriceRange({
    products: productsFilteredByCategoryId,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
  });
  const productsFilteredByPrice = getProductsByPrice(productsFilteredByPriceRange, query.price);
  const productsFilteredByTitle = getProductsByTitle(productsFilteredByPrice, query.title);

  return productsFilteredByTitle;
}

function getSliceIndex(products, query) {
  const offset = query.offset ? Number(query.offset) : 0;
  const limit = query.limit ? Number(query.limit) : products.length;
  const endIndex = offset + limit > products.length ? products.length : offset + limit;

  return {
    startIndex: offset,
    endIndex,
  };
}

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb 참고
const SECURITY_KEY = process.env.SECURITY_KEY;
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

app.get('/users', (_, res) => {
  res.send(usersJSON);
});

app.get('/user', (req, res) => {
  const decryptedData = decrypt(req.headers.authorization);
  const user = usersJSON.users.find(({ id }) => decryptedData === String(id));

  if (!user) {
    return res.status(404).send('not found');
  }

  res.send(user);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const result = usersJSON.users.find((user) => user.email === email && user.password === password);

  if (!result) {
    return res.status(401).send({ errorCode: 401000, message: '정보가 일치하지 않습니다.' });
  }

  const cookieConfig = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  };

  const encryptedData = encrypt(String(result.id));

  res.cookie('access_token', encryptedData, cookieConfig);
  res.send({ ...result, access_token: encryptedData });
});

app.post('/users', (req, res) => {
  const { email, password, name } = req.body;
  const { users } = usersJSON;

  if (!password.length) {
    return res
      .status(400)
      .send({ field: 'password', errorCode: 400001, message: '패스워드를 입력해주세요!' });
  }

  if (!name.length) {
    return res
      .status(400)
      .send({ field: 'name', errorCode: 400002, message: '이메일을 입력해주세요!' });
  }

  if (!email.length || !EMAIL_PATTERN.test(email)) {
    return res
      .status(400)
      .send({ field: 'email', errorCode: 400003, message: '잘못된 이메일 양식입니다!' });
  }

  if (users.find((user) => user.email === email)) {
    return res
      .status(400)
      .send({ field: 'email', errorCode: 400004, message: '이미 존재하는 메일입니다!' });
  }

  const newUser = { id: users.length + 1, name, email, password };

  fs.writeFileSync(
    `${__dirname}/server/response/users.json`,
    JSON.stringify({
      users: [...users, newUser],
    }),
  );

  res.status(200).send(newUser);
});

// products
app.get('/products', (req, res) => {
  const filteredProducts = getFilteredProductsByQuery(productsJSON, req.query);
  const { startIndex, endIndex } = getSliceIndex(filteredProducts, req.query);
  const lastPage = endIndex === filteredProducts.length;

  res.send({
    products: filteredProducts.slice(startIndex, endIndex),
    lastPage,
  });
});

app.get('/products/:id', (req, res) => {
  const product = productsJSON.find(({ id }) => String(id) === req.params.id);
  if (product) {
    return res.send(product);
  }

  res.status(404).send('not found');
});

app.get('/categories', (_, res) => {
  res.send(categoriesJSON);
});

app.get('/couponList', (_, res) => {
  res.send(couponListJSON);
});

app.post('/purchase', async (_, res) => {
  const waitTime = getRandomArbitrary(100, 5000);
  await wait(waitTime);
  const result = getResult();

  if (result) {
    res.send(true);
  } else {
    res.status(500).send('internal error');
  }
});

const level = {
  INFO: 'INFO',
  ERROR: 'ERROR',
};

app.post('/log', (req, res) => {
  const { userId, level, message } = req.body;
  if (!userId) {
    return res.status(400).send('userId가 필요합니다.');
  }

  fs.appendFileSync(
    './server/paymentResult.log',
    `LOG[${level}]: userId: ${userId} | date: ${new Date()} | message: ${message}\n`,
    (error) => {
      throw error;
    },
  );

  return res.status(200);
});

app.listen(process.env.PORT || 3000);
