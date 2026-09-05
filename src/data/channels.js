// Contact channels shown on the Home contact section.
// Order = display order in the UI.

export const channels = [
  {
    key: 'EMAIL',
    label: 'email',
    value: 'dp@dgpugliese.dev',
    href: 'mailto:dp@dgpugliese.dev',
    note: 'plaintext · routine traffic',
  },
  {
    key: 'SIGNAL',
    label: 'signal',
    value: 'dgpugliese.33',
    href: null, // Signal usernames are looked up in-app; no universal deep link.
    note: 'encrypted · search username in Signal',
  },
  {
    key: 'PGP',
    label: 'pgp',
    // TODO: replace with real fingerprint once key is generated and published
    // to keys.openpgp.org for dp@dgpugliese.dev.
    value: 'pending — keys.openpgp.org',
    href: 'https://keys.openpgp.org/search?q=dp%40dgpugliese.dev',
    note: 'sign / encrypt · key search by email',
    pending: true,
  },
];
