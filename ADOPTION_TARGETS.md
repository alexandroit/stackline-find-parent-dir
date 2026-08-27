# Adoption Targets

The lowest-risk migration uses an npm alias and preserves source imports:

```json
{
  "dependencies": {
    "find-parent-dir": "npm:@stackline/find-parent-dir@^1.0.0"
  }
}
```

Verified public usage patterns include:

| Consumer | Observed contract |
| --- | --- |
| Modernizr | Direct CommonJS import and `.sync` |
| Plone Volto | ESM default import |
| Pulsar | Direct CommonJS import and `.sync` |
| Arduino tooling | Historical package dependency |
| Pulsar Jasmine 5 runner | Parent lookup during test setup |

Outreach must be specific, evidence-based, and rate-limited. Do not open bulk
issues or describe the upstream error behavior as a vulnerability without a
demonstrated security impact.
