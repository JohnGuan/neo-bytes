export type Options = {
	/**
	Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.

	@default false
	*/
	readonly signed?: boolean;

	/**
	- If `false`: Output won't be localized.
	- If `true`: Localize the output using the system/browser locale.
	- If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
	- If `string[]`: Expects a list of [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)

	@default false
	*/
	readonly locale?: boolean | string | readonly string[];

	/**
	Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

	@default false

	@example
	```
	import neoBytes from 'neo-bytes';

	neoBytes(1337, {bits: true});
	//=> '1.34 kbit'
	```
	*/
	readonly bits?: boolean;

	/**
	Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix). This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.

	@default false

	@example
	```
	import neoBytes from 'neo-bytes';

	neoBytes(1000, {binary: true});
	//=> '1000 bit'

	neoBytes(1024, {binary: true});
	//=> '1 kiB'
	```
	*/
	readonly binary?: boolean;

	/**
	The minimum number of fraction digits to display.

	If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

	@default undefined

	@example
	```
	import neoBytes from 'neo-bytes';

	// Show the number with at least 3 fractional digits
	neoBytes(1900, {minimumFractionDigits: 3});
	//=> '1.900 kB'

	neoBytes(1900);
	//=> '1.9 kB'
	```
	*/
	readonly minimumFractionDigits?: number;

	/**
	The maximum number of fraction digits to display.

	If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

	@default undefined

	@example
	```
	import neoBytes from 'neo-bytes';

	// Show the number with at most 1 fractional digit
	neoBytes(1920, {maximumFractionDigits: 1});
	//=> '1.9 kB'

	neoBytes(1920);
	//=> '1.92 kB'
	```
	*/
	readonly maximumFractionDigits?: number;

	/**
	Put a space between the number and unit.

	@default true

	@example
	```
	import neoBytes from 'neo-bytes';

	neoBytes(1920, {space: false});
	//=> '1.9kB'

	neoBytes(1920);
	//=> '1.92 kB'
	```
	*/
	readonly space?: boolean;

	/**
	 * Remove 'i' from the binary enabled formatted output.
	 * @default false
	 * @example
	 * ```
	 * import neoBytes from 'neo-bytes';
	 * neoBytes(1024, {binary: true, noi: true});
	 * //=> '1 kB'
	 * ```
	 */
	readonly noi?: boolean;

	/**
	 * Remove 'it' from the bits enabled formatted output.
	 * @default false
	 * @example
	 * ```
	 * import neoBytes from 'neo-bytes';
	 * neoBytes(1337, {bits: true, noit: true});
	 * //=> '1.34 kb'
	 * ```
	 */
	readonly noit?: boolean;

	/**
	 * Suffix to append to the formatted number.
	 * @default ''
	 * @example
	 * ```
	 * import neoBytes from 'neo-bytes';
	 * neoBytes(1337, {suffix: '/s'});
	 * //=> '1.34 kB/s'
	 * ```
	 */
	readonly suffix?: string;
};

/**
Convert bytes to a human readable string: `1337` → `1.34 kB`.

@param number - The number to format.

@example
```
import neoBytes from 'neo-bytes';

neoBytes(1337);
//=> '1.34 kB'

neoBytes(100);
//=> '100 B'

// Display file size differences
neoBytes(42, {signed: true});
//=> '+42 B'

// Localized output using German locale
neoBytes(1337, {locale: 'de'});
//=> '1,34 kB'
```
*/
export default function neoBytes(number: number, options?: Options): string;
