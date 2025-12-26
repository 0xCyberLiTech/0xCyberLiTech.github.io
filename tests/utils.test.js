// tests/utils.test.js
// Tests unitaires pour utilEscapeHTML

import { utilEscapeHTML } from '../assets/utils/utils.js';

describe('utilEscapeHTML', () => {
  it('échappe les caractères spéciaux HTML', () => {
    expect(utilEscapeHTML('<div>"test" & test</div>')).toBe('&lt;div&gt;&quot;test&quot; &amp; test&lt;&#x2F;div&gt;');
  });

  it('gère les valeurs null, undefined, number, boolean', () => {
    expect(utilEscapeHTML(null)).toBe('null');
    expect(utilEscapeHTML(undefined)).toBe('undefined');
    expect(utilEscapeHTML(123)).toBe('123');
    expect(utilEscapeHTML(true)).toBe('true');
  });

  it('échappe les apostrophes et slashs', () => {
    expect(utilEscapeHTML("O'Reilly / test")).toBe('O&#x27;Reilly &#x2F; test');
  });

  it('ne modifie pas une chaîne sûre', () => {
    expect(utilEscapeHTML('abc')).toBe('abc');
  });
});
