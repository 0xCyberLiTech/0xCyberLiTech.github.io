// Tests unitaires pour utilEscapeHTML
import { utilEscapeHTML } from '../assets/utils/utils.js';

describe('utilEscapeHTML', () => {
  it('échappe les balises < et >', () => {
    expect(utilEscapeHTML('<div>')).toBe('&lt;div&gt;');
  });
  it('échappe les guillemets simples et doubles', () => {
    expect(utilEscapeHTML(`'"`)).toBe('&#x27;&quot;');
  });
  it('échappe les esperluettes', () => {
    expect(utilEscapeHTML('&')).toBe('&amp;');
  });
  it('échappe les slashs', () => {
    expect(utilEscapeHTML('/')).toBe('&#x2F;');
  });
  it('échappe un script XSS', () => {
    expect(utilEscapeHTML('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });
  it('gère les valeurs non-string', () => {
    expect(utilEscapeHTML(null)).toBe('null');
    expect(utilEscapeHTML(undefined)).toBe('undefined');
    expect(utilEscapeHTML(123)).toBe('123');
    expect(utilEscapeHTML(true)).toBe('true');
  });
});
