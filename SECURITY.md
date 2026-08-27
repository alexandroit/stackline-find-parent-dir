# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |
| Upstream 0.x | No, maintained by its upstream owner |

## Reporting a vulnerability

Use GitHub private vulnerability reporting for this repository. If that channel
is unavailable, contact the maintainer through the security address on the
Stackline organization profile.

Include the package and Node.js versions, operating system, path shape, clue,
minimal reproduction, expected impact, and known workaround. Do not open a
public issue before a coordinated fix is available.

We will acknowledge a complete report within five business days, investigate
it privately, and coordinate disclosure and credit. Symlink traversal and
filesystem permissions are security-sensitive compatibility boundaries; a
report should explain the concrete boundary violation rather than assuming that
every path difference is exploitable.
