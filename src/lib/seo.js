import { useEffect } from 'react';

const SITE = 'https://dgpugliese.dev';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, name] = selector.match(/meta\[(name|property)="([^"]+)"\]/) || [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Per-route document meta. Sets title, description, canonical, and OG/Twitter
 * mirrors. Optionally injects a page-specific JSON-LD block.
 */
export function useSeo({ title, description, path = '/', image, jsonLd } = {}) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    if (title) document.title = title;
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[name="twitter:title"]', 'content', title);
    }
    setMeta('meta[property="og:url"]', 'content', url);
    setLink('canonical', url);
    if (image) {
      setMeta('meta[property="og:image"]', 'content', image);
      setMeta('meta[name="twitter:image"]', 'content', image);
    }
    if (jsonLd) setJsonLd('page', jsonLd);
    return () => {
      const el = document.head.querySelector('script[data-jsonld="page"]');
      if (el) el.remove();
    };
  }, [title, description, path, image, JSON.stringify(jsonLd)]);
}
