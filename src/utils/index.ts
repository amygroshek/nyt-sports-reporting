

// Decode encoded string to get raw HTML
export const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Remove extraneous HTML comments from reddit html
export const cleanHtml = (text: string) => {
  return text
    ? decodeHtml(text)
        .replace('<!-- SC_OFF -->', '')
        .replace('<!-- SC_ON -->', '')
    : '';

};


