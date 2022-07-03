# Router

## Installation

``` console
npm install https://github.com/JamesRobertHugginsNgo/router.git#5.0.0
```

## Usage

``` JavaScript
const route = ({ hash, paths, query, router }) => {
  if (paths.length === 1 && paths[0] === 'page-1') {
    /* ... */
    return;
  }

  if (paths.length === 1 && paths[0] === 'page-2') {
    /* ... */
    return;
  }

  if (paths.length === 1 && paths[0] === 'page-3') {
    /* ... */
    return;
  }

  if (paths.length === 1 && paths[0] === 'page-4') {
    /* ... */
    return;
  }

  // router.push('page-1');
  router.replace('page-1');
};

const router = new Route(route);
router.start();
```
