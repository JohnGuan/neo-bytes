# neo-bytes

> Convert bytes to a human readable string: `1337` → `1.34 kB`

Useful for displaying file sizes for humans.

*Note that it uses base-10 (e.g. kilobyte).
[Read about the difference between kilobyte and kibibyte.](https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/)*

> This project stands on the shoulders of the great **[pretty-bytes](https://github.com/sindresorhus/pretty-bytes) by [Sindre Sorhus](https://github.com/sindresorhus)**. 
> It is a fork of the original project with additional features.

## Install

```sh
npm install neo-bytes
```

## Usage

```js
import neoBytes from 'neo-bytes';

neoBytes(1337);
//=> '1.34 kB'

neoBytes(100);
//=> '100 B'

// Display with units of bits
neoBytes(1337, {bits: true});
//=> '1.34 kbit'

// Display file size differences
neoBytes(42, {signed: true});
//=> '+42 B'

// Localized output using German locale
neoBytes(1337, {locale: 'de'});
//=> '1,34 kB'
```

## Migrating from `pretty-bytes`

```js
import prettyBytes from 'pretty-bytes';
//                       vvv
import prettyBytes from 'neo-bytes';
```

## API

### neoBytes(number, options?)

#### number

Type: `number`

The number to format.

#### options

Type: `object`

##### signed

Type: `boolean`\
Default: `false`

Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.

##### bits

Type: `boolean`\
Default: `false`

Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

##### binary

Type: `boolean`\
Default: `false`

Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix). This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.

##### locale

Type: `boolean | string`\
Default: `false` *(No localization)*

**Important:** Only the number and decimal separator are localized. The unit title is not and will not be localized.

- If `true`: Localize the output using the system/browser locale.
- If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
- If `string[]`: Expects a list of [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)

##### minimumFractionDigits

Type: `number`\
Default: `undefined`

The minimum number of fraction digits to display.

If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

```js
import neoBytes from 'neo-bytes';

// Show the number with at least 3 fractional digits
neoBytes(1900, {minimumFractionDigits: 3});
//=> '1.900 kB'

neoBytes(1900);
//=> '1.9 kB'
```

##### maximumFractionDigits

Type: `number`\
Default: `undefined`

The maximum number of fraction digits to display.

If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

```js
import neoBytes from 'neo-bytes';

// Show the number with at most 1 fractional digit
neoBytes(1920, {maximumFractionDigits: 1});
//=> '1.9 kB'

neoBytes(1920);
//=> '1.92 kB'
```

##### space

Type: `boolean`\
Default: `true`

Put a space between the number and unit.

```js
import neoBytes from 'neo-bytes';

neoBytes(1920, {space: false});
//=> '1.9kB'

neoBytes(1920);
//=> '1.92 kB'
```

##### noi

Type: `boolean`\
Default: `false`

Remove 'i' from the `binary` enabled formatted output.
  
```js
import neoBytes from 'neo-bytes';

neoBytes(1024, {binary: true});
//=> '1 kiB'

neoBytes(1024, {binary: true, noi: true});
//=> '1 kB'
```

##### noit

Type: `boolean`\
Default: `false`

Remove 'it' from the `bits` enabled formatted output.

```js
import neoBytes from 'neo-bytes';

neoBytes(1337, {bits: true});
//=> '1.34 kbit'

neoBytes(1337, {bits: true, noit: true});
//=> '1.34 kb'
```

##### suffix

Type: `string`\
Default: `undefined`

Suffix to append to the formatted number.

```js
import neoBytes from 'neo-bytes';

neoBytes(1337, {suffix: '/s'});
//=> '1.34 kB/s'

neoBytes(10e8, {bits: true, noit: true, suffix: 'ps'});
//=> '1 Gbps'

neoBytes(10e9, {bits: true, space: false, noit: true, suffix: 'ps'})
//=> '10Gbps'
```

## Related

- [pretty-bytes](https://github.com/sindresorhus/pretty-bytes) - Original module
- [pretty-bytes-cli](https://github.com/sindresorhus/pretty-bytes-cli) - CLI for original module
- [pretty-ms](https://github.com/sindresorhus/pretty-ms) - Convert milliseconds to a human readable string
