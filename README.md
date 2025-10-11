# Moss Tabs

This is a fork of the [Dockview library](https://github.com/mathuo/dockview).

## Key Differences

-   Horizontal tab scrolling with touchpad support
-   The monorepo now exports from `packages/dockview-react/dist`

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
