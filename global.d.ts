interface IAnyObject {
  [key: string]: any;
}

interface Language {
  code: string;
  name: string;
}

interface Collections {
  languages: Language;
  [key: string]: unknown;
}
