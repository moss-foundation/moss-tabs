# Moss Tabs

This is a fork of the [Dockview library](https://github.com/mathuo/dockview).

## Key Differences

-   In `packages/dockview` rollup now generates a `index.d.ts` file with the types of a package and all of it's dependencies
-   The monorepo now exports from `packages/dockview-react/dist`
-   Horizontal tab scrolling with touchpad support

## Development

**Starting the docs/dev server**

```bash
cd packages/docs
yarn start
```

> note: `concurrently` must be installed globally for the dev server to start.

```bash
npm -g i concurrently
```

---

**Building packages**

To build necessary packages run

```bash
yarn build:react
```
