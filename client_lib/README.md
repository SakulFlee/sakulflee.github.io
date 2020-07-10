# ClientLib

The _ClientLib_ is meant to be run on the client-side (i.e. Browsers) to modify `<code>...</code>` blocks on your website.
_ClientLib_ will add some **basic** syntax highlighting and add some other features like e.g. line-numbers.
This is done to improve **visuals** of `<code>...</code>` blocks.

## Building

While it is possible to build this project with rust (e.g. `cargo build`), it won't generate the wanted outcome.

> You need to install [WASM-Pack](https://rustwasm.github.io/wasm-pack/) for the next steps

### NodeJS Module

Building the project into a NodeJS-Module can be done with:

```bash
wasm-pack build
```

This will generate a **WASM** and **JavaScript**, as well as **TypeScript**, files and a **package.json**.

The default output directory is `./pkg/`.
It can be changed with `--out-dir <location>`.

If you don't need (or want) **TypeScript** files, they can be disabled with `--no-typescript`.

### Web

If you don't want to use [NodeJS] for your website (frontend), you can use `--target web`:

```bash
wasm-pack build --target web
```

This will also generate the files mentioned above, but does not require [NodeJS] to be used.  
Simply serve both files (`client_lib.js` and `client_lib_bg.wasm`) with your web server and add the following to your head:

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <script type="module">
        import init from '/client_lib/client_lib.js';
        async function run() {
            await init();
        }
        run();
    </script>
  </head>
  <body>
    ...
  </body>
</html>
```

This will load the generated **JavaScript** file, which defines the **WASM** context and loads, as well as executes, the **WASM** binary.

[NodeJS]: https://nodejs.org/en/
