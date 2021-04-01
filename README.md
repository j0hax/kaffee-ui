# kaffee-ui

![screenshot](screenshots/main.png "Zweiter Screenshot")
![screenshot](screenshots/list.png "Übersicht der Konten")

## Funktion
- `index.html` ist die Hauptseite, welche nie verlassen wird.
    - `book.html` erlaubt es, Nutzer zu buchen.
    - `list.html` ist die Tabelle mit Übersicht der Salden.

Nutzer werden mittels `localStorage` in einem stringified Array zwischengespeichert. Dieses kann mit dem [kaffee-server](https://github.com/j0hax/kaffee-server) verknüpft werden.



### Datenbeispiel
```json
[
   {
      "balance":9001,
      "drinkCount":42,
      "hash":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "id":1,
      "lastUpdate":1617281972.4809017,
      "name":"Johannes Arnold"
   }
]
```
*Beispiel: Nutzer Johannes Arnold hatte 90,01€ eingezahlt und inzwischen wieder 42 Kaffee getrunken.*

## Konfiguration

Die Seite muss mit einer einfach Datei `config.js` vor Inbetriebnahme konfiguriert werden.

Vor allem wichtig ist ein API-Schlüssel zu erzeugen, wenn der Server eingesetzt wird.

### Beispielkonfiguration
```javascript
const config = {
  apiKey: 'pClZQgSXmHgIt1sHeOpb64iHrLxfc+7D',
  server: 'http://localhost:8080/api',
  drinkPrice: 30
}
```
