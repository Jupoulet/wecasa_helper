import { Country } from '.';

const emojiByCountry = {
  FR: '🇫🇷',
  DE: '🇩🇪',
  GB: '🇬🇧',
  AT: '🇦🇹',
  CH: '🇨🇭',
}
export const Layout = (props: { children?: any, country: Country }) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wecasa helper</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style="padding: 1em 2em">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-8">Wecasa Helper {emojiByCountry[props.country]}</h1>
        {props.children}
      </body>
    </html>
  )
};