import { parseISO, format } from 'date-fns';
import { nl, fr, de, es, enGB } from "date-fns/locale";
export default function Date({ dateString, style, language, className }) {
  const date = parseISO(dateString);
  var locales = {nl, fr,enGB, de,es};
  if(language =='en')
    language = 'enGB';
  var locale = locales[language];
  
  return <time className={className} dateTime={dateString} style={style}>{format(date, 'LLLL d, yyyy', {locale})}</time>;
}