/**
 * The URL for the LDAP server we're authentication our requests against
 */

export default {
  AUTH_URL: process.env.AUTH_URL
    ? process.env.AUTH_URL
    : "http://hslinux:38383/api/v1/auth",
};
