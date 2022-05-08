function RAD(x) {
	return x * (Math.PI / 180);
}
function DEG(x) {
	return x * (180 / Math.PI);
}

function sun_geom_mean_lon(t) {
	/* FIXME returned value should always be positive */
	return RAD((280.46646 + t * (36000.76983 + t * 0.0003032)) % 360);
}

function sun_geom_mean_anomaly(t) {
	return RAD(357.52911 + t * (35999.05029 - t * 0.0001537));
}

function sun_equation_of_center(t) {
	/* Use the first three terms of the equation. */
	var m = sun_geom_mean_anomaly(t);
	var c = Math.sin(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) + Math.sin(2 * m) * (0.019993 - 0.000101 * t) + Math.sin(3 * m) * 0.000289;
	return RAD(c);
}

export function sun_true_lon(t) {
	var l_0 = sun_geom_mean_lon(t);
	var c = sun_equation_of_center(t);
	return l_0 + c;
}

export function sun_apparent_lon(t) {
	var o = sun_true_lon(t);
	return RAD(DEG(o) - 0.00569 - 0.00478 * Math.sin(RAD(125.04 - 1934.136 * t)));
}

function mean_ecliptic_obliquity(t) {
	var sec = 21.448 - t * (46.815 + t * (0.00059 - t * 0.001813));
	return RAD(23.0 + (26.0 + sec / 60.0) / 60.0);
}

function obliquity_corr(t) {
	var e_0 = mean_ecliptic_obliquity(t);
	var omega = 125.04 - t * 1934.136;
	return RAD(DEG(e_0) + 0.00256 * Math.cos(RAD(omega)));
}

export function solar_declination(t) {
	var e = obliquity_corr(t);
	var lambda = sun_apparent_lon(t);
	return Math.asin(Math.sin(e) * Math.sin(lambda));
}
