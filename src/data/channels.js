// Contact channels shown on the Home contact section.
// Order = display order in the UI.

export const MAILTO =
  'mailto:dp@dgpugliese.dev?subject=' +
  encodeURIComponent('Hello from dgpugliese.dev') +
  '&body=' +
  encodeURIComponent("Hi David,\n\nWhat I'm working on:\n\nWhat I'd like help with:\n\nTimeline / pressure:\n\n— ");

export const channels = [
  {
    key: 'EMAIL',
    label: 'email',
    value: 'dp@dgpugliese.dev',
    href: MAILTO,
    note: 'plaintext · routine traffic',
  },
  {
    key: 'SIGNAL',
    label: 'signal',
    value: 'dgpugliese.33',
    href: null, // Signal usernames are looked up in-app; no universal deep link.
    note: 'encrypted · search username in Signal',
  },
];
