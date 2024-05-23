import test from 'ava';
import neoBytes from './index.js';

test('throws on invalid input', t => {
	t.throws(() => {
		neoBytes('');
	});

	t.throws(() => {
		neoBytes('1');
	});

	t.throws(() => {
		neoBytes(Number.NaN);
	});

	t.throws(() => {
		neoBytes(true);
	});

	t.throws(() => {
		neoBytes(Number.POSITIVE_INFINITY);
	});

	t.throws(() => {
		neoBytes(Number.NEGATIVE_INFINITY);
	});

	t.throws(() => {
		neoBytes(null);
	});
});

test('converts bytes to human readable strings', t => {
	t.is(neoBytes(0), '0 B');
	t.is(neoBytes(0.4), '0.4 B');
	t.is(neoBytes(0.7), '0.7 B');
	t.is(neoBytes(10), '10 B');
	t.is(neoBytes(10.1), '10.1 B');
	t.is(neoBytes(999), '999 B');
	t.is(neoBytes(1001), '1 kB');
	t.is(neoBytes(1e16), '10 PB');
	t.is(neoBytes(1e30), '1 QB');
	t.is(neoBytes(1e33), '1000 QB');
});

test('supports negative number', t => {
	t.is(neoBytes(-0.4), '-0.4 B');
	t.is(neoBytes(-0.7), '-0.7 B');
	t.is(neoBytes(-10.1), '-10.1 B');
	t.is(neoBytes(-999), '-999 B');
	t.is(neoBytes(-1001), '-1 kB');
});

test('locale option', t => {
	t.is(neoBytes(-0.4, {locale: 'de'}), '-0,4 B');
	t.is(neoBytes(0.4, {locale: 'de'}), '0,4 B');
	t.is(neoBytes(1001, {locale: 'de'}), '1 kB');
	t.is(neoBytes(10.1, {locale: 'de'}), '10,1 B');
	t.is(neoBytes(1e30, {locale: 'de'}), '1 QB');
	t.is(neoBytes(1e33, {locale: 'de'}), '1.000 QB');

	t.is(neoBytes(-0.4, {locale: 'en'}), '-0.4 B');
	t.is(neoBytes(0.4, {locale: 'en'}), '0.4 B');
	t.is(neoBytes(1001, {locale: 'en'}), '1 kB');
	t.is(neoBytes(10.1, {locale: 'en'}), '10.1 B');
	t.is(neoBytes(1e30, {locale: 'en'}), '1 QB');
	t.is(neoBytes(1e33, {locale: 'en'}), '1,000 QB');

	t.is(neoBytes(-0.4, {locale: ['unknown', 'de', 'en']}), '-0,4 B');
	t.is(neoBytes(0.4, {locale: ['unknown', 'de', 'en']}), '0,4 B');
	t.is(neoBytes(1001, {locale: ['unknown', 'de', 'en']}), '1 kB');
	t.is(neoBytes(10.1, {locale: ['unknown', 'de', 'en']}), '10,1 B');
	t.is(neoBytes(1e30, {locale: ['unknown', 'de', 'en']}), '1 QB');
	t.is(neoBytes(1e33, {locale: ['unknown', 'de', 'en']}), '1.000 QB');

	t.is(neoBytes(-0.4, {locale: true}), '-0.4 B');
	t.is(neoBytes(0.4, {locale: true}), '0.4 B');
	t.is(neoBytes(1001, {locale: true}), '1 kB');
	t.is(neoBytes(10.1, {locale: true}), '10.1 B');
	t.is(neoBytes(1e30, {locale: true}), '1 QB');
	t.is(neoBytes(1e33, {locale: true}), '1,000 QB');

	t.is(neoBytes(-0.4, {locale: false}), '-0.4 B');
	t.is(neoBytes(0.4, {locale: false}), '0.4 B');
	t.is(neoBytes(1001, {locale: false}), '1 kB');
	t.is(neoBytes(10.1, {locale: false}), '10.1 B');
	t.is(neoBytes(1e30, {locale: false}), '1 QB');
	t.is(neoBytes(1e33, {locale: false}), '1000 QB');

	t.is(neoBytes(-0.4, {locale: undefined}), '-0.4 B');
	t.is(neoBytes(0.4, {locale: undefined}), '0.4 B');
	t.is(neoBytes(1001, {locale: undefined}), '1 kB');
	t.is(neoBytes(10.1, {locale: undefined}), '10.1 B');
	t.is(neoBytes(1e30, {locale: undefined}), '1 QB');
	t.is(neoBytes(1e33, {locale: undefined}), '1000 QB');
});

test('signed option', t => {
	t.is(neoBytes(42, {signed: true}), '+42 B');
	t.is(neoBytes(-13, {signed: true}), '-13 B');
	t.is(neoBytes(0, {signed: true}), ' 0 B');
});

test('bits option', t => {
	t.is(neoBytes(0, {bits: true}), '0 b');
	t.is(neoBytes(0.4, {bits: true}), '0.4 b');
	t.is(neoBytes(0.7, {bits: true}), '0.7 b');
	t.is(neoBytes(10, {bits: true}), '10 b');
	t.is(neoBytes(10.1, {bits: true}), '10.1 b');
	t.is(neoBytes(999, {bits: true}), '999 b');
	t.is(neoBytes(1001, {bits: true}), '1 kbit');
	t.is(neoBytes(1001, {bits: true}), '1 kbit');
	t.is(neoBytes(1e16, {bits: true}), '10 Pbit');
	t.is(neoBytes(1e30, {bits: true}), '1 Qbit');
	t.is(neoBytes(1e33, {bits: true}), '1000 Qbit');
});

test('bits and noi option', t => {
	t.is(neoBytes(0, {bits: true, noi: true}), '0 b');
	t.is(neoBytes(10, {bits: true, noi: true}), '10 b');
	t.is(neoBytes(1001, {bits: true, noi: true}), '1 kbit');
	t.is(neoBytes(1e16, {bits: true, noi: true}), '10 Pbit');
	t.is(neoBytes(1e30, {bits: true, noi: true}), '1 Qbit');
	t.is(neoBytes(1e33, {bits: true, noi: true}), '1000 Qbit');
});

test('bits and noit option', t => {
	t.is(neoBytes(0, {bits: true, noit: true}), '0 b');
	t.is(neoBytes(10, {bits: true, noit: true}), '10 b');
	t.is(neoBytes(1001, {bits: true, noit: true}), '1 kb');
	t.is(neoBytes(1e16, {bits: true, noit: true}), '10 Pb');
	t.is(neoBytes(1e30, {bits: true, noit: true}), '1 Qb');
	t.is(neoBytes(1e33, {bits: true, noit: true}), '1000 Qb');
});

test('bits, noi and noit option', t => {
	t.is(neoBytes(0, {bits: true, noi: true, noit: true}), '0 b');
	t.is(neoBytes(10, {bits: true, noi: true, noit: true}), '10 b');
	t.is(neoBytes(1001, {bits: true, noi: true, noit: true}), '1 kb');
	t.is(neoBytes(1e16, {bits: true, noi: true, noit: true}), '10 Pb');
	t.is(neoBytes(1e30, {bits: true, noi: true, noit: true}), '1 Qb');
	t.is(neoBytes(1e33, {bits: true, noi: true, noit: true}), '1000 Qb');
});

test('binary option', t => {
	t.is(neoBytes(0, {binary: true}), '0 B');
	t.is(neoBytes(4, {binary: true}), '4 B');
	t.is(neoBytes(10, {binary: true}), '10 B');
	t.is(neoBytes(10.1, {binary: true}), '10.1 B');
	t.is(neoBytes(999, {binary: true}), '999 B');
	t.is(neoBytes(1025, {binary: true}), '1 KiB');
	t.is(neoBytes(1001, {binary: true}), '1000 B');
	t.is(neoBytes(1e16, {binary: true}), '8.88 PiB');
	t.is(neoBytes(1e30, {binary: true}), '827000 YiB');
});

test('binary and noi option', t => {
	t.is(neoBytes(0, {binary: true, noi: true}), '0 B');
	t.is(neoBytes(10, {binary: true, noi: true}), '10 B');
	t.is(neoBytes(1025, {binary: true, noi: true}), '1 KB');
	t.is(neoBytes(1e30, {binary: true, noi: true}), '827000 YB');
});

test('binary and noit option', t => {
	t.is(neoBytes(0, {binary: true, noit: true}), '0 B');
	t.is(neoBytes(4, {binary: true, noit: true}), '4 B');
	t.is(neoBytes(10, {binary: true, noit: true}), '10 B');
	t.is(neoBytes(10.1, {binary: true, noit: true}), '10.1 B');
	t.is(neoBytes(999, {binary: true, noit: true}), '999 B');
	t.is(neoBytes(1025, {binary: true, noit: true}), '1 KiB');
	t.is(neoBytes(1001, {binary: true, noit: true}), '1000 B');
	t.is(neoBytes(1e16, {binary: true, noit: true}), '8.88 PiB');
	t.is(neoBytes(1e30, {binary: true, noit: true}), '827000 YiB');
});

test('binary, noi and noit option', t => {
	t.is(neoBytes(0, {binary: true, noi: true, noit: true}), '0 B');
	t.is(neoBytes(4, {binary: true, noi: true, noit: true}), '4 B');
	t.is(neoBytes(10, {binary: true, noi: true, noit: true}), '10 B');
	t.is(neoBytes(10.1, {binary: true, noi: true, noit: true}), '10.1 B');
	t.is(neoBytes(999, {binary: true, noi: true, noit: true}), '999 B');
	t.is(neoBytes(1025, {binary: true, noi: true, noit: true}), '1 KB');
	t.is(neoBytes(1001, {binary: true, noi: true, noit: true}), '1000 B');
	t.is(neoBytes(1e16, {binary: true, noi: true, noit: true}), '8.88 PB');
	t.is(neoBytes(1e30, {binary: true, noi: true, noit: true}), '827000 YB');
});

test('bits and binary option', t => {
	t.is(neoBytes(0, {bits: true, binary: true}), '0 b');
	t.is(neoBytes(4, {bits: true, binary: true}), '4 b');
	t.is(neoBytes(10, {bits: true, binary: true}), '10 b');
	t.is(neoBytes(999, {bits: true, binary: true}), '999 b');
	t.is(neoBytes(1025, {bits: true, binary: true}), '1 kibit');
	t.is(neoBytes(1e6, {bits: true, binary: true}), '977 kibit');
});

test('bits, binary and noi option', t => {
	t.is(neoBytes(0, {bits: true, binary: true, noi: true}), '0 b');
	t.is(neoBytes(4, {bits: true, binary: true, noi: true}), '4 b');
	t.is(neoBytes(10, {bits: true, binary: true, noi: true}), '10 b');
	t.is(neoBytes(999, {bits: true, binary: true, noi: true}), '999 b');
	t.is(neoBytes(1025, {bits: true, binary: true, noi: true}), '1 kbit');
	t.is(neoBytes(1e6, {bits: true, binary: true, noi: true}), '977 kbit');
});

test('bits, binary and noit option', t => {
	t.is(neoBytes(0, {bits: true, binary: true, noit: true}), '0 b');
	t.is(neoBytes(4, {bits: true, binary: true, noit: true}), '4 b');
	t.is(neoBytes(10, {bits: true, binary: true, noit: true}), '10 b');
	t.is(neoBytes(999, {bits: true, binary: true, noit: true}), '999 b');
	t.is(neoBytes(1025, {bits: true, binary: true, noit: true}), '1 kib');
	t.is(neoBytes(1e6, {bits: true, binary: true, noit: true}), '977 kib');
});

test('bits, binary, noi and noit option', t => {
	t.is(neoBytes(0, {bits: true, binary: true, noi: true, noit: true}), '0 b');
	t.is(neoBytes(4, {bits: true, binary: true, noi: true, noit: true}), '4 b');
	t.is(neoBytes(10, {bits: true, binary: true, noi: true, noit: true}), '10 b');
	t.is(neoBytes(999, {bits: true, binary: true, noi: true, noit: true}), '999 b');
	t.is(neoBytes(1025, {bits: true, binary: true, noi: true, noit: true}), '1 kb');
	t.is(neoBytes(1e6, {bits: true, binary: true, noi: true, noit: true}), '977 kb');
});

test('fractional digits options', t => {
	t.is(neoBytes(1900, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(neoBytes(1900, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(neoBytes(1911, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(neoBytes(1111, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(neoBytes(1019, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(neoBytes(1001, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(neoBytes(1000, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(neoBytes(3942, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is.skip(neoBytes(59_952_784, {maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is.skip(neoBytes(59_952_784, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is(neoBytes(4001, {maximumFractionDigits: 3, binary: true}), '3.907 KiB');
	t.is(neoBytes(18_717, {maximumFractionDigits: 2, binary: true}), '18.28 KiB');
	t.is(neoBytes(18_717, {maximumFractionDigits: 4, binary: true}), '18.2783 KiB');
	t.is(neoBytes(32_768, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 KiB');
	t.is(neoBytes(65_536, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 KiB');
});

test('space option', t => {
	t.is(neoBytes(0), '0 B');
	t.is(neoBytes(0, {space: false}), '0B');
	t.is(neoBytes(999), '999 B');
	t.is(neoBytes(999, {space: false}), '999B');
	t.is(neoBytes(-13, {signed: true}), '-13 B');
	t.is(neoBytes(-13, {signed: true, space: false}), '-13B');
	t.is(neoBytes(42, {signed: true}), '+42 B');
	t.is(neoBytes(42, {signed: true, space: false}), '+42B');
});

test('suffix option', t => {
	t.is(neoBytes(999, {suffix: '/s'}), '999 B/s');
	t.is(neoBytes(10e7, {suffix: '/s'}), '100 MB/s');
	t.is(neoBytes(10e8, {bits: true, noit: true, suffix: 'ps'}), '1 Gbps');
	t.is(neoBytes(10e9, {bits: true, noit: true, suffix: 'ps'}), '10 Gbps');
});
