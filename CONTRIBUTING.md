## tooling.

- `node.js>=20`
- `uv` [installation](https://docs.astral.sh/uv/)
- `cargo` [installation](https://www.rust-lang.org/tools/install)

> [!tip]
> Recommended to use `uv` to install python and manage virtualenvs for `tinymorph`.

## structure.

`docs`: include both references and exploration notes for `tinymorph`
  - uses https://github.com/jackyzha0/quartz

`crates`: contains all UI related for the editors

`python`: include all ML-related models

`scripts`: infra stuff for general tooling

`.github`: All CI-related lives here.


## docs.

For building docs do the following (first time):

```bash
cd docs && npm i
```

All consequent run can be used with:

```bash
npx quartz build --serve
```
