// from http://en.wikipedia.org/wiki/Earth_radius
/*
/ Equatorial radius
/ The Earth's equatorial radius a, or semi-major axis, is the distance from its center to the equator and equals 6,378.1370 km (?3,963.191 mi; ?3,443.918 nmi).
*/
var EarthRadiusMeters = 6378137.0; // meters
/* Based the on the Latitude/longitude spherical geodesy formulae & scripts
   at http://www.movable-type.co.uk/scripts/latlong.html
   (c) Chris Veness 2002-2010
*/ 
google.maps.LatLng.prototype.DestinationPoint = function (brng, dist) {
  var R = EarthRadiusMeters; // earth's mean radius in meters
var brng = brng.toRad();
var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();
var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist/R) + 
                      Math.cos(lat1)*Math.sin(dist/R)*Math.cos(brng) );
var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist/R)*Math.cos(lat1), 
                             Math.cos(dist/R)-Math.sin(lat1)*Math.sin(lat2));

return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}

/* Based the on the Latitude/longitude spherical geodesy formulae & scripts
   at http://www.movable-type.co.uk/scripts/latlong.html
   (c) Chris Veness 2002-2010
*/ 
google.maps.LatLng.prototype.rhumbDestinationPoint = function (brng, dist) {
  var R = EarthRadiusMeters; // earth's mean radius in meters
  var d = parseFloat(dist) / R;  // d = angular distance covered on earth's surface
  var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();
  brng = brng.toRad();

  var lat2 = lat1 + d * Math.cos(brng);
  var dLat = lat2 - lat1;
  var dPhi = Math.log(Math.tan(lat2 / 2 + Math.PI / 4) / Math.tan(lat1 / 2 + Math.PI / 4));
  var q = (Math.abs(dLat) > 1e-10) ? dLat / dPhi : Math.cos(lat1);
  var dLon = d * Math.sin(brng) / q;
  // check for going past the pole
  if (Math.abs(lat2) > Math.PI / 2) {
    lat2 = lat2 > 0 ? Math.PI - lat2 : - (Math.PI - lat2);
  }
  var lon2 = (lon1 + dLon + Math.PI) % (2 * Math.PI) - Math.PI;
 
  if (isNaN(lat2) || isNaN(lon2)) {
    alert("bad Rhumb Destination Point");
    return null;
  }
  return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
};

/** 
 * Returns the distance from this point to the supplied point, in km, travelling along a rhumb line 
 * 
 *   see http://williams.best.vwh.net/avform.htm#Rhumb 
 * 
 * @param   {LatLon} point: Latitude/longitude of destination point 
 * @returns {Number} Distance in meters between this point and destination point 
 */ 
/* Based the on the Latitude/longitude spherical geodesy formulae & scripts
   at http://www.movable-type.co.uk/scripts/latlong.html
   (c) Chris Veness 2002-2010
*/ 
google.maps.LatLng.prototype.rhumbDistanceTo = function(point) { 
  var R = EarthRadiusMeters; // earth's mean radius in meters
  var lat1 = this.lat().toRad(), lat2 = point.lat().toRad(); 
  var dLat = (point.lat()-this.lat()).toRad(); 
  var dLon = Math.abs(point.lng()-this.lng()).toRad(); 
   
  var dPhi = Math.log(Math.tan(lat2/2+Math.PI/4)/Math.tan(lat1/2+Math.PI/4)); 
  var q = (!isNaN(dLat/dPhi) && isFinite(dLat/dPhi)) ? dLat/dPhi : Math.cos(lat1);  // E-W line gives dPhi=0 
  // if dLon over 180� take shorter rhumb across 180� meridian: 
  if (dLon > Math.PI) dLon = 2*Math.PI - dLon; 
  var dist = Math.sqrt(dLat*dLat + q*q*dLon*dLon) * R;  
   
  return dist;  // 4 sig figs reflects typical 0.3% accuracy of spherical model 
} 

/**
 * Extend the Number object to convert degrees to radians
 *
 * @return {Number} Bearing in radians
 * @ignore
 */ 
Number.prototype.toRad = function () {
  return this * Math.PI / 180;
};

/**
 * Extend the Number object to convert radians to degrees
 *
 * @return {Number} Bearing in degrees
 * @ignore
 */ 
Number.prototype.toDeg = function () {
  return this * 180 / Math.PI;
};

/**
 * Normalize a heading in degrees to between 0 and +360
 *
 * @return {Number} Return 
 * @ignore
 */ 
Number.prototype.toBrng = function () {
  return (this.toDeg() + 360) % 360;
};
