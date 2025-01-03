# Sign In Security Considerations

Robot accounts aren't meant to have interactive sessions so basic auth is the only authentication mechanism against the harbor api (no cookie tokens). This means credentials need to be stored in either `session-storage` or `local-storage`. Doing so leaves said credentials vulnerable to XSS. In an ideal world this is a non-issue since the pages don't take JS from any other sources, but browser extensions exist, etc.
