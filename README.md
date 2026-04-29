# Ceanna Academy Website

This package contains a static multi-page website for Ceanna Academy.

## Pages

English pages are in the project root:

- `index.html`
- `services.html`
- `pricing.html`
- `international-students.html`
- `contact.html`

Traditional Chinese pages are in `zh-hant/` and Simplified Chinese pages are in `zh-hans/`.

## How to preview

Open `index.html` in a browser. The language switcher links to the matching Traditional Chinese and Simplified Chinese pages.

## How to update contact details

Open `assets/js/config.js` and add your real contact details:

```js
window.CEANNA_CONFIG = {
  email: "hello@yourdomain.ca",
  phone: "+1 (780) 000-0000",
  location: "Edmonton, Alberta",
  hours: "By appointment"
};
```

The contact form uses the email address in this file to open a pre-filled email draft.

## How to replace the logo

Replace `assets/img/logo.svg` or `assets/img/logo.png` with your final transparent logo. If you use a PNG file, update the image paths in the HTML from `logo.svg` to `logo.png`.

## Notes about international student services

The wording intentionally avoids presenting Ceanna Academy as a paid immigration representative. It describes academic consulting, school application support, document organization, and coordination with authorized professionals when regulated immigration advice or representation is required.

## Pricing included

The pricing tables were transcribed from the screenshots provided:

- Tutoring hourly rates from Grade 7–8 to University 4XX
- Career and academic consultation individual pricing
- Career consultant package pricing

Mock exam and international student academic consulting are listed as custom-quote services because no exact mock exam or international student package prices were provided.
