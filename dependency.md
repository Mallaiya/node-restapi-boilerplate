# Dev dependencies

1. eslint
    npm i eslint --save-dev
    npx eslint --init (use airbnb base)
    npm i eslint-plugin-node eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
2. prettier
    npm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev
3. babel
    npm i @babel/core @babel/cli @babel/preset-env @babel/node --save-dev
    "start": "nodemon --exec babel-node -- index.js --watch *"
    "build": "babel src --out-dir dist" (add whether you needed)
    "serve": "node dist/index.js" (add whether you needed)
4. nodemon
    npm i nodemon --save-dev
5. husky 
    npm i husky --save-dev
6. lint-staged
    npm i lint-staged --save-dev
7.  dotenv
    npm i dotenv --save